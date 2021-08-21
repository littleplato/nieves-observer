from astroplan import Observer
from astropy.coordinates import SkyCoord
from astroplan import FixedTarget
from astropy.time import Time
import astropy.units as u
from astropy.coordinates import EarthLocation
import numpy as np
import utils


def show_dso(dso, position):
    location = EarthLocation.from_geodetic(
        float(position.latitude)*u.deg, float(position.longitude)*u.deg)
    observatory = Observer(location=location, name="observatory")
    time = Time(position.date) + np.linspace(-12, 12, 48)*u.hour
    object_attributes = FixedTarget(
        name=dso.name, coord=SkyCoord(dso.ra, dso.dec, frame='icrs'))
    altitude = observatory.altaz(time, object_attributes).alt.degree
    altitude[altitude < 0] = -1
    max_alt = max(altitude)
    plot_data = [{"alt": f'{y:.2f}', "time": x.plot_date, "name": z}
                 for x, y, z in zip(time, altitude, utils.time_points_detailed)]
    dso_data = {"id": dso.id,
                "params": dso.params,
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
    time = Time(position.date) + np.linspace(-12, 12, 24)*u.hour
    for dso in dso_array:
        if len(objects_that_are_up) < 6:
            object_attributes = FixedTarget(
                name=dso.name, coord=SkyCoord(dso.ra, dso.dec, frame='icrs'))
            if observatory.target_is_up(Time(position.date), object_attributes):
                altitude = observatory.altaz(
                    time, object_attributes).alt.degree
                altitude[altitude < 0] = -1
                max_alt = max(altitude)
                plot_data = [{"alt": f'{y:.2f}', "time": x.plot_date, "name": z}
                             for x, y, z in zip(time, altitude, utils.time_points)]
                plot = {"id": dso.id,
                        "params": dso.params,
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


def landing_algo(dso_array, position):
    selected_types = []
    objects_to_show = []
    location = EarthLocation.from_geodetic(
        float(position.latitude)*u.deg, float(position.longitude)*u.deg)
    observatory = Observer(location=location, name="observatory")
    time = Time(position.date) + np.linspace(-12, 12, 24)*u.hour
    for dso in dso_array:
        if len(objects_to_show) < 7:
            if any(dso.type == x for x in selected_types) == False:
                object_attributes = FixedTarget(
                    name=dso.name, coord=SkyCoord(dso.ra, dso.dec, frame='icrs'))
                if observatory.target_is_up(Time(position.date), object_attributes):
                    altitude = observatory.altaz(
                        time, object_attributes).alt.degree
                    altitude[altitude < 0] = -1
                    max_alt = max(altitude)
                    if max_alt > 40:
                        plot_data = [{"alt": f'{y:.2f}', "time": x.plot_date, "name": z}
                                     for x, y, z in zip(time, altitude, utils.time_points)]
                        plot = {"id": dso.id,
                                "params": dso.params,
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
                        selected_types.append(dso.type)
                        objects_to_show.append(plot)
        else:
            break
    return objects_to_show


def rank_by_alt(objects_with_plots):
    sorted_dso = sorted(objects_with_plots, key=lambda k: k['max_alt'])
    sorted_dso.reverse()
    return sorted_dso


def scheduler_derive_plot(dso_array, position):
    scheduler_objects = []
    location = EarthLocation.from_geodetic(
        float(position.latitude)*u.deg, float(position.longitude)*u.deg)
    observatory = Observer(location=location, name="observatory")
    time = Time(position.date) + np.linspace(-12, 12, 48)*u.hour
    for dso in dso_array:
        object_attributes = FixedTarget(
            name=dso.name, coord=SkyCoord(dso.ra, dso.dec, frame='icrs'))
        altitude = observatory.altaz(time, object_attributes).alt.degree
        altitude[altitude < 0] = -1
        max_alt = max(altitude)
        plot_data = [{"alt": f'{y:.2f}', "time": x.plot_date, "name": z}
                     for x, y, z in zip(time, altitude, utils.time_points_detailed)]
        dso_data = {**dso,
                    "max_alt": max_alt,
                    "plot": plot_data}
        scheduler_objects.append(dso_data)
    return scheduler_objects
