from astroplan import FixedTarget, Observer, EclipsingSystem
from astroplan import is_event_observable, AtNightConstraint, AltitudeConstraint, LocalTimeConstraint
from astropy.coordinates import SkyCoord
from astropy.time import Time
import astropy.units as u
from astropy.coordinates import EarthLocation
import numpy as np
import utils
import datetime as dt


def check_viewable_transits(exoplanets, position):
    upcoming_transits = []
    location = EarthLocation.from_geodetic(
        float(position.latitude)*u.deg, float(position.longitude)*u.deg)
    observatory = Observer(location=location, name="observatory")
    obs_time = Time(position.date)
    n_transits = 7
    min_local_time = dt.time(20, 0)  # 20:00 local time (8pm)
    max_local_time = dt.time(5, 0)  # 05:00 local time (5am)
    if len(upcoming_transits) < 5:
        for exoplanet in exoplanets:
            target = FixedTarget(name=exoplanet.planet, coord=SkyCoord(
                exoplanet.ra, exoplanet.dec, frame='icrs'))
            formatted_transit_time = dt.datetime.strptime(
                exoplanet.midpoint, "%m/%d/%Y %H:%M").strftime("%Y-%m-%d %H:%M:%S")
            primary_eclipse_time = Time(formatted_transit_time, format='iso')
            orbital_period = float(exoplanet.period) * u.day
            eclipse_duration = float(exoplanet.duration) * u.hour
            selected_exoplanet = EclipsingSystem(primary_eclipse_time=primary_eclipse_time,
                                                 orbital_period=orbital_period, duration=eclipse_duration, name=exoplanet.planet)
            constraints = [AtNightConstraint.twilight_civil(), AltitudeConstraint(
                min=30*u.deg), LocalTimeConstraint(min=min_local_time, max=max_local_time)]
            ing_egr = selected_exoplanet.next_primary_ingress_egress_time(
                obs_time, n_eclipses=n_transits)
            observable_list = is_event_observable(
                constraints, observatory, target, times_ingress_egress=ing_egr)
            next_dates = []
            for j in range(len(observable_list[0])):
                if observable_list[0][j]:
                    next_dates.append(ing_egr[j])
            if len(next_dates) > 0:
                ingress, exgress = next_dates[0][0].jd, next_dates[0][1].jd
                transit_mid = (ingress+exgress)/2
                dip_mag = float(exoplanet.mag) * \
                    (1 - (float(exoplanet.depth)/100))
                transit_plot = [{"time": ingress-0.02, "mag": float(exoplanet.mag)},
                                {"time": ingress, "mag": float(exoplanet.mag)},
                                {"time": ingress+0.01, "mag": dip_mag},
                                {"time": transit_mid, "mag": dip_mag},
                                {"time": exgress-0.01, "mag": dip_mag},
                                {"time": exgress, "mag": float(exoplanet.mag)},
                                {"time": exgress+0.02, "mag": float(exoplanet.mag)}]
                exoplanet_data = {"id": exoplanet.id,
                                  'planet': exoplanet.planet,
                                  'ra': exoplanet.ra,
                                  'dec': exoplanet.dec,
                                  'mag': exoplanet.mag,
                                  'period': exoplanet.period,
                                  'duration': exoplanet.duration,
                                  'depth': exoplanet.depth,
                                  'midpoint': exoplanet.midpoint,
                                  'date': Time(next_dates[0][0]).iso,
                                  'ingress': ingress,
                                  "exgress": exgress,
                                  'ingress_date': Time(next_dates[0][0]).iso,
                                  'exgress_date': Time(next_dates[0][1]).iso,
                                  'transit_plot': transit_plot}
                upcoming_transits.append(exoplanet_data)
    return upcoming_transits


def exoplanet_with_plot(exoplanet, position):
    location = EarthLocation.from_geodetic(
        float(position.latitude)*u.deg, float(position.longitude)*u.deg)
    observatory = Observer(location=location, name="observatory")
    time = Time(exoplanet['ingress']) + np.linspace(-12, 12, 48)*u.hour
    object_attributes = FixedTarget(
        name=exoplanet['planet'], coord=SkyCoord(exoplanet['ra'], exoplanet['dec'], frame='icrs'))
    altitude = observatory.altaz(time, object_attributes).alt.degree
    altitude[altitude < 0] = -1
    max_alt = max(altitude)
    plot_data = [{"alt": f'{y:.2f}', "time": x.plot_date, "name": z}
                 for x, y, z in zip(time, altitude, utils.time_points_detailed)]
    exoplanet_data = {**exoplanet,
                      "max_alt": max_alt,
                      "plot": plot_data}
    return exoplanet_data
