<img src="https://i.ibb.co/17rkNKG/logo192.png" alt="Nieves Observer" align="right">

# Nieves Observer

> An observation planner for the Nieves Observatory

Quickly look up astronomical objects for research and plan your night imaging the objects. The Nieves Observer is a full-stack web application designed for the Nieves Observatory for astronomical research and education.

## Description

This project is part of the upcoming "GROWTH (Global Relay of Watching Transients Happen) for undergraduates" programme. The project aims to equip astronomy undergraduates around the world with hands-on research skills using remotely-operated telescopes around world. The project right now has formal and informal access to the following observatories housing research-grade optical telescopes:

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

The algorithms dealing with astronomical and astrometrical calculations are built using the astroplan and Astropy libraries.

E.g., the altitude and airmass plots are generated using a modified snippet from astroplan's source code.

```python
from astropy.time import Time
import astropy.units as u
from astropy.coordinates import EarthLocation, SkyCoord
from astroplan import Observer, FixedTarget

def altitude_plot(latitude, longitude, astro_object):
    location = EarthLocation.from_geodetic(latitude*u.deg, longitude*u.deg)
    observatory = Observer(location=location, name="observatory")
    timespan = Time(today) + np.linspace(-12, 12, 24)*u.hour
    object_attributes = FixedTarget(name=astro_object.name,
                            coord=SkyCoord(astro_object.ra, astro_object.dec, frame='icrs'))
    altitude = observatory.altaz(timespan, object_attributes).alt.degree
    plot = [{"alt": f'{y:.2f}', "time": x.plot_date}
                             for x, y in zip(timespan, altitude)]
    return plot
```

## Development

### Built With

1. PostgreSQL
1. Python (general): BeautifulSoup, pandas, Astropy, astroplan, NumPy, Psycopg 2
1. Flask: Flask-RESTful, Flask-SQLAlchemy
1. React: Jotai, React Query, React Router, Recharts, Material-UI

### Prerequisites

1. PostgreSQL 13.3
1. Python 3.9.6
1. Pipenv
1. Node 16.2.0
1. Text editor of some kind

## Setting Up Dev

To develop the app, install the requisite libraries for the server and client locally.

### Server

The server is built using Flask, and developing the app in an environment (e.g. Pipenv) is recommended.

```shell
git clone https://github.com/weejerrick/nieves-observer.git
cd server
pipenv shell
pipenv install -r requirements.txt
```

For the app to work as intended, your Postgres database has to be seeded with initial data. The schemas for the SQL tables can be found in the Flask app.

### Client

Similarly, for the client, `npm install` the files listed in `package.json`.

```shell
cd ../client
npm i
```

The server url is hidden on a `.env` file. Create a `.env` and add a variable `REACT_APP_SERVER_URL` with the url that the local server will be running on. E.g.,

```shell
touch .env
echo "REACT_APP_SERVER_URL=http://localhost:5000/" >> .env
```

## Astronomical Data

The detailed astronomical data are obtained from [Dr. Wolfgang Steinicke's catalogue](http://www.klima-luft.de/steinicke/ngcic/ngcic_e.htm) of NGC/IC and Messier objects.\
The deep-sky objects' images are web scrapped from Wikipedia, which were themselves scrapped mostly from NASA & ESO/Hubble.\
Exoplanet data are obtained from the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/).

## Licensing

[MIT](https://choosealicense.com/licenses/mit/)
