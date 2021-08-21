from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from algorithm import check_up_objects_with_plot, show_dso, rank_by_alt, landing_algo, scheduler_derive_plot
from exoplanet_algo import check_viewable_transits, exoplanet_with_plot
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()
# =============
# FLASK CONFIG
# =============
app = Flask(__name__)
CORS(app)
api = Api(app)

# ===============
# POSTGRES CONFIG
# ===============
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("HEROKU")
db = SQLAlchemy(app)

# ===============
# DB Models
# ===============


class DSOModel(db.Model):
    __tablename__ = "dso"
    id = db.Column(db.Integer, primary_key=True)
    params = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    ngcic = db.Column(db.String, nullable=False)
    common = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    ra = db.Column(db.String, nullable=False)
    dec = db.Column(db.String, nullable=False)
    mag = db.Column(db.String, nullable=False)
    dist = db.Column(db.String, nullable=False)
    con = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)


class ExoplanetsModel(db.Model):
    __tablename__ = "exoplanets"
    id = db.Column(db.Integer, primary_key=True)
    planet = db.Column(db.String, unique=True, nullable=False)
    ra = db.Column(db.String, nullable=False)
    dec = db.Column(db.String, nullable=False)
    mag = db.Column(db.String, nullable=False)
    period = db.Column(db.String, nullable=False)
    duration = db.Column(db.String, nullable=False)
    depth = db.Column(db.String, nullable=False)
    midpoint = db.Column(db.String, nullable=False)


# =======
# PARSER
# =======
# This is what comes in from client to flask
parser = reqparse.RequestParser()
parser.add_argument("date", type=str)
parser.add_argument("longitude", type=str)
parser.add_argument("latitude", type=str)

dso_type_parser = reqparse.RequestParser()
dso_type_parser.add_argument("date", type=str)
dso_type_parser.add_argument("longitude", type=str)
dso_type_parser.add_argument("latitude", type=str)
dso_type_parser.add_argument("dso_type", type=str)

scheduler_parser = reqparse.RequestParser()
scheduler_parser.add_argument(
    "savedData", action='append')  # an array of strings
scheduler_parser.add_argument("date", type=str)
scheduler_parser.add_argument("longitude", type=str)
scheduler_parser.add_argument("latitude", type=str)

search_parser = reqparse.RequestParser()
search_parser.add_argument("search", type=str)

# ==========
# SERIALIZER
# ==========
# This is what goes out from flask to client
dso_fields = {
    'id': fields.String,
    'params': fields.String,
    'name': fields.String,
    'ngcic': fields.String,
    'common': fields.String,
    'type': fields.String,
    'ra': fields.String,
    'dec': fields.String,
    'mag': fields.String,
    'dist': fields.String,
    'con': fields.String,
    'image': fields.String,
}

dso_with_plot_fields = {
    'id': fields.String,
    'params': fields.String,
    'name': fields.String,
    'ngcic': fields.String,
    'common': fields.String,
    'type': fields.String,
    'ra': fields.String,
    'dec': fields.String,
    'mag': fields.Float,
    'dist': fields.Float,
    'con': fields.String,
    'image': fields.String,
    'max_alt': fields.Float,
    "plot": fields.String
}

exoplanets_fields = {
    'id': fields.String,
    'planet': fields.String,
    'ra': fields.String,
    'dec': fields.String,
    'mag': fields.String,
    'period': fields.String,
    'duration': fields.String,
    'depth': fields.String,
    'midpoint': fields.String,
    'date': fields.String,
    'ingress': fields.String,
    'exgress': fields.String,
    'ingress_date': fields.String,
    'exgress_date': fields.String,
    'max_alt': fields.Float,
    "transit_plot": fields.String,
    # "plot": fields.String
}

# ============
# CONTROLLERS
# ============
# API routes


class Test(Resource):
    def get(self):
        return {"message": "this works"}


class Landing(Resource):
    @marshal_with(dso_fields)
    def get(self):
        all_objects = DSOModel.query.all()
        return all_objects

    @marshal_with(dso_with_plot_fields)
    def post(self):
        position_data = parser.parse_args()
        all_objects = DSOModel.query.all()
        to_show_objects = landing_algo(all_objects, position_data)
        sorted_up_objects = rank_by_alt(to_show_objects)
        return sorted_up_objects


class DSOFilter(Resource):
    @marshal_with(dso_with_plot_fields)
    def post(self):
        request = dso_type_parser.parse_args()
        all_objects = DSOModel.query.filter_by(type=request.dso_type).all()
        up_objects = check_up_objects_with_plot(all_objects, request)
        sorted_up_filtered_objects = rank_by_alt(up_objects)
        return sorted_up_filtered_objects


class DSOShow(Resource):
    @marshal_with(dso_fields)
    def get(self, params):
        dso = DSOModel.query.filter_by(params=params).first()
        return dso

    @marshal_with(dso_with_plot_fields)
    def post(self, params):
        position_data = parser.parse_args()
        dso = DSOModel.query.filter_by(params=params).first()
        dso_data = show_dso(dso, position_data)
        return dso_data


class Scheduler(Resource):
    @marshal_with(dso_with_plot_fields)
    def post(self):
        input_from_client = scheduler_parser.parse_args()
        objects_agg = DSOModel.query.filter(
            DSOModel.params.in_(input_from_client.savedData)).all()
        objects_agg_with_plots = scheduler_derive_plot(
            objects_agg, input_from_client)
        return objects_agg_with_plots


class Search(Resource):
    @marshal_with(dso_fields)
    def post(self):
        search_arg = search_parser.parse_args()
        search_term_params = "%{}%".format(search_arg.search.lower())
        search_term_type = "%{}%".format(search_arg.search.title())
        search_term_common = "%{}%".format(search_arg.search.title())
        search_results = DSOModel.query.filter(
            DSOModel.params.like(search_term_params) | DSOModel.type.like(search_term_type) | DSOModel.common.like(search_term_common)).all()
        return search_results


class Exoplanets(Resource):
    @marshal_with(exoplanets_fields)
    def post(self):
        position_data = parser.parse_args()
        all_exoplanets = ExoplanetsModel.query.all()
        viewable_exoplanets = check_viewable_transits(
            all_exoplanets, position_data)
        return viewable_exoplanets


api.add_resource(Test, "/")
api.add_resource(Landing, "/dso")
api.add_resource(DSOFilter, "/dso/filter")
api.add_resource(DSOShow, "/dso/<params>")
api.add_resource(Scheduler, "/scheduler")
api.add_resource(Exoplanets, "/exoplanets")
api.add_resource(Search, "/search")


# ==========
# LISTENER
# ==========
if __name__ == "__main__":
    app.run(debug=False)  # set to false when in production
