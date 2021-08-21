<img src="https://i.ibb.co/17rkNKG/logo192.png" alt="Nieves Observer" align="right">

# Nieves Observer

> An observation planner for the Nieves Observatory

Quickly look up astronomical objects for research and plan your night imaging the objects. The Nieves Observer is a full-stack web application designed for the Nieves Observatory for astronomical research and education.

## Description

This project is part of the upcoming "GROWTH (Global Relay of Watching Transients Happening) for undergraduates" programme. The project aims to equip astronomy undergraduates around the world with hands-on research skills using remotely-operated telescopes around world. The project right now has informal access to three such observatories housing research-grade optical telescopes:

<img align="left" src="https://i.ibb.co/TrxNDnT/nieves-md.jpg" alt="Nieves Observatory">

### Nieves Observatory

The Nieves Observatory is based in California and was built in 2019 housing a 0.3m CDK optical telescope. The telescope is equipped with a research-grade FLI camera and a filter wheel with both broad-band (Sloan) and narrow-band filters. The observatory is owned by the Soka University of America, funded by the Nieves Family Foundation.

  <img align="left" src="https://i.ibb.co/jLZzBq0/lcro-md.jpg" alt="LCRO">

### Las Campanas Remote Observatory (LCRO)

The LCRO sits on top the mountains of Chile's Atacama Desert, housing an almost-identical 0.3m CDK optical telescope. The LCRO is a joint project of the LCO, Astro Physics Corporation, Finger Lakes Instruments, Mike Long, Dave Jurasevich, and SSC Observatories.

The app is part of a larger pipeline that includes:

1. Getting access to telescopes
1. Learning to operate the telescopes
1. Reducing and manipulating the images from the observatories
1. Obtaining and analysing research results from the images

The Nieves Observer comes in in Step 2 to help educators and students select valuable targets, which reduces time wastage on the telescopes.

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

## Development

### Built With

1. PostgreSQL
1. Python (general): BeautifulSoup, pandas, astropy, astroplan, numpy, psycopg2
1. Flask: flask-restful, flask-sqlalchemy
1. React: Jotai, React Query, react-router, Recharts, Material-UI

### Prerequisites

1. PostgreSQL 13.3
1. Python 3.9.6
1. Pipenv
1. Node 16.2.0
1. Text editor of some kind

## Setting Up Dev

Set up the system locally by installing the requisite packages for the server and client.

### Server

The server is built in Flask, and developing the app in an environment using `pipenv` is recommended.

```shell
git clone https://github.com/weejerrick/nieves-observer.git
cd server
pipenv shell
pipenv install -r requirements.txt
```

For the app to work as intended, your Postgres has to be seeded with initial data. The schema for the SQL table can be found in the Flask app.

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

## Astronomical Data

The detailed astronomical data is obtained from [Dr. Wolfgang Steinicke's catalogue](http://www.klima-luft.de/steinicke/ngcic/ngcic_e.htm) of NGCIC and Messier objects.
Images are web scrapped from Wikipedia, which were themselves scrapped mostly from NASA & ESO/Hubble.

## Licensing

[MIT](https://choosealicense.com/licenses/mit/)
