<img src="https://i.ibb.co/17rkNKG/logo192.png" alt="Logo of the project" align="right">

# Nieves Observer

> An observation planner for the Nieves Observatory

Quickly look up astronomical objects for research. The Nieves Observer is a full-stack web application designed for the Nieves Observatory for astronomical research and education.

## Development

### Built With

1. PostgreSQL
1. Python (general): BeautifulSoup, pandas, astropy, astroplan, numpy, psycopg2
1. Flask: flask-restful, flask-sqlalchemy
1. React: Jotai, React Query, react-router, Recharts, Material-UI

### Prerequisites

1. PostgreSQL 13.3
1. Python 3.9.6
1. Node 16.2.0
1. Text editor of some kind

## Setting Up Dev

Set up the system locally by installing the requisite packages for the server and client.

### Server

The server is built in Python, and developing the app in an environment using `pipenv` is recommended.

```shell
git clone
cd server
pipenv shell
pipenv install -r requirements.txt
```

For the app to work as intended, your Postgres has to be seeded with initial data.

### Client

Similarly, for the client, `npm install` the files listed in `package.json`.

```shell
cd ../client
npm i
```

The server url is hidden on a `.env` file. Create a `.env` and add a variable `REACT_APP_SERVER_URL` with the url that the local server will be running on. E.g.,

```shell
touch .env
echo "REACT_APP_SERVER_URL=localhost:/5000" >> .env
```

## Astronomy

The logic of the app rests on the algorithms in the server. The altitude and airmass plots are generated through a modified snippet from `astroplan`'s source code.

```shell
from astropy.time import Time
import astropy.units as u
from astropy.coordinates import EarthLocation
from astropy.coordinates import SkyCoord
from astroplan import Observer

location = EarthLocation.from_geodetic(latitude*u.deg, longitude*u.deg)
observatory = Observer(location=location, name="observatory")
time = Time(today) + np.linspace(-12, 12, 24)*u.hour
object_attributes = FixedTarget(name=name, coord=SkyCoord(ra, dec, frame='icrs'))
altitude = observatory.altaz(time, object_attributes).alt.degree
```

## Licensing

[MIT](https://choosealicense.com/licenses/mit/)
