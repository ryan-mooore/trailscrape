import re, requests
import json

import classes
from selenium import webdriver
from bs4 import BeautifulSoup
import time
import os
import routes
with open("regions.json") as json_stream:
    regions = json_stream.read()
    json_stream.close()

import sys
sys.path.append('../..')

from difflib import get_close_matches
import trailforks

def create_tf_relation():
    tf_trail_names     = list(map(lambda x: x[0], region._tfdata))
    module_trail_names = region._module.get_names(soup)

    tfdict = {}

    for id in range(len(webnames)):
        matches = get_close_matches(webnames[id], tfnames)
        if matches:
            match = matches[0]
            tfdict[id] = classes.Trail(*region._tfdata[tfnames.index(match)])
        else:
            tfdict[id] = None
    
    return tfdict

regions_json = json.loads(regions)

for region_json in regions_json:

    region = classes.RegionHelper(
        region_json,                            #builder json
        trailforks.scrape(region_json["trailforksRegionID"]), #trailforks scrape results
        classes.Region(),                       #region class
        routes.route()[region_json["moduleID"]] #scraper module
    )

    if region._json["scrapeWithDriver"]:
        options = webdriver.ChromeOptions()
        options.add_argument("headless")
        driver = webdriver.Chrome(options=options)
        driver.get(region._json["url"])
        time.sleep(2)
        soup = BeautifulSoup(driver.page_source, "html.parser")
        driver.close()

    else:
        content = requests.get(region._json["url"])
        soup = BeautifulSoup(content.text, "html.parser")



    if region._json["included"]["name"]:
        names = region._module.get_names(soup)
    else:
        continue

    if region._json["included"]["grade"]:
        grades = region._module.get_grades(soup)
    else:
        grades = {}
        tfdict = create_tf_relation()
        for id in range(len(names)):
            if tfdict[id]:
                grades[id] = tfdict[id].grade
            else:
                grades[id] = None


    if region._json["included"]["status"]:
        statuses = region._module.get_status(soup)


    if region._json["hasUplifts"]:
        if region._json["included"]["liftStatus"]:
            region._class.lift_is_open = region._module.get_lift_status()
        else:
            region._class.lift_is_open = None

    if region._json["included"]["parkStatus"]:
        region._class.park_is_open = region._module.get_park_status()
    else:
        region._class.park_is_open = None
