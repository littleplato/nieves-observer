from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from algorithm import check_up_objects_with_plot, show_dso
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
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DB_URI")
db = SQLAlchemy(app)

# ===============
# DB Models
# ===============


class DSOModel(db.Model):
    __tablename__ = "dso"
    id = db.Column(db.Integer, primary_key=True)
    dso_id = db.Column(db.String, unique=True, nullable=False)
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


# =======
# PARSER
# =======
# This is what comes in from client to flask
parser = reqparse.RequestParser()
parser.add_argument("date", type=str)
parser.add_argument("longitude", type=str)
parser.add_argument("latitude", type=str)

# ==========
# SERIALIZER
# ==========
# This is what goes out from flask to client
dso_fields = {
    'id': fields.String,
    'dso_id': fields.String,
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
    'dso_id': fields.String,
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
        result = check_up_objects_with_plot(all_objects, position_data)
        return result


class DSOShow(Resource):
    @marshal_with(dso_fields)
    def get(self, dso_id):
        dso = DSOModel.query.filter_by(id=dso_id).first()
        return dso

    @marshal_with(dso_with_plot_fields)
    def post(self, dso_id):
        position_data = parser.parse_args()
        dso = DSOModel.query.filter_by(id=dso_id).first()
        dso_data = show_dso(dso, position_data)
        return dso_data


api.add_resource(Test, "/")
api.add_resource(Landing, "/dso")
api.add_resource(DSOShow, "/dso/<dso_id>")


# ==========
# LISTENER
# ==========
if __name__ == "__main__":
    app.run(debug=False)  # set to false when in production
