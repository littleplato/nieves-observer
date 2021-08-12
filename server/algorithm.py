from astroplan import Observer
from astropy.coordinates import SkyCoord
from astroplan import FixedTarget
from astropy.time import Time
import astropy.units as u
from astropy.coordinates import EarthLocation
import numpy as np


def show_dso(dso, position):
    location = EarthLocation.from_geodetic(
        float(position.latitude)*u.deg, float(position.longitude)*u.deg)
    observatory = Observer(location=location, name="observatory")
    time = Time(position.date) + np.linspace(-12, 12, 30)*u.hour
    object_attributes = FixedTarget(
        name=dso.name, coord=SkyCoord(dso.ra, dso.dec, frame='icrs'))
    altitude = observatory.altaz(time, object_attributes).alt.degree
    altitude[altitude < 0] = -1
    max_alt = max(altitude)
    plot_data = [{"alt": y, "time": x.plot_date}
                 for x, y in zip(time, altitude)]
    dso_data = {"id": dso.id,
                "name": dso.name,
                "ngcic": dso.ngcic,
                "common": dso.common,
                "type": dso.type,
                "ra": dso.ra,
                "dec": dso.dec,
                "mag": dso.mag,
                "dist": dso.dist,
                "con": dso.con,
                "image": dso.image,
                "max_alt": max_alt,
                "plot": plot_data}
    return dso_data


def check_up_objects_with_plot(dso_array, position):
    objects_that_are_up = []
    location = EarthLocation.from_geodetic(
        float(position.latitude)*u.deg, float(position.longitude)*u.deg)
    observatory = Observer(location=location, name="observatory")
    time = Time(position.date) + np.linspace(-12, 12, 30)*u.hour
    for dso in dso_array:
        if len(objects_that_are_up) < 10:
            object_attributes = FixedTarget(
                name=dso.name, coord=SkyCoord(dso.ra, dso.dec, frame='icrs'))
            if observatory.target_is_up(Time(position.date), object_attributes):
                altitude = observatory.altaz(
                    time, object_attributes).alt.degree
                altitude[altitude < 0] = -1
                max_alt = max(altitude)
                plot_data = [{"alt": y, "time": x.plot_date} for x, y in zip(
                    time, altitude)]
                # object destructuring is **dso
                plot = {"id": dso.id,
                        "name": dso.name,
                        "ngcic": dso.ngcic,
                        "common": dso.common,
                        "type": dso.type,
                        "ra": dso.ra,
                        "dec": dso.dec,
                        "mag": dso.mag,
                        "dist": dso.dist,
                        "con": dso.con,
                        "image": dso.image,
                        "max_alt": max_alt,
                        "plot": plot_data}
                objects_that_are_up.append(plot)

        else:
            break
    return objects_that_are_up
