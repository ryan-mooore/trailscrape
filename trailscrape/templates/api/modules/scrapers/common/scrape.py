import re, requests
import json


import pprint

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

def get_soup(scrape_with_driver):
    if scrape_with_driver:
        options = webdriver.ChromeOptions()
        options.add_argument("headless")
        driver = webdriver.Chrome(options=options)
        driver.get(region_json["url"])
        time.sleep(2)
        soup = BeautifulSoup(driver.page_source, "html.parser")
        driver.close()

    else:
        content = requests.get(region_json["url"])
        soup = BeautifulSoup(content.text, "html.parser")

    return soup




regions_json = json.loads(regions)


for region_json in regions_json:

    if region_json["includes"]["name"]:
        trails = routes.route()[region_json["moduleID"]].scrape(get_soup(region_json["scrapeWithDriver"]))
        trails = list(map(lambda trail: classes.Trail(*trail), trails))
        
        region = classes.Region(region_json["name"], None, None, trails)
    else:
        continue
    
    tf_data = trailforks.scrape(region_json["trailforksRegionID"])
    tf_trail_names       = list(map(lambda x: x.name, tf_data))

    for trail in trails:
        matches = get_close_matches(trail.name, tf_trail_names)
        if matches:
            match = matches[0]
            trail.tf_data = tf_data[tf_trail_names.index(match)]
        else:
            trail.tf_data = None
    




    if not region_json["includes"]["grade"]:        
        for trail in trails:
            if trail.tf_data.grade:
                trail.grade = trail.tf_data.grade

    if region_json["includes"]["status"] and region_json["includes"]["parkStatus"]:
        region.park_is_open = parkStatus

    if region_json["includes"]["status"] and not region_json["includes"]["parkStatus"]:
        region._class.park_is_open = False

        for status in region._module.get_status(soup):
            if status:
                region._class.park_is_open = True

    if not region_json["includes"]["status"] and region_json["includes"]["parkStatus"]:
        if region._module.get_park_status == False:
            statuses = {}
            for id in range(len(names)):
                statuses[id] = False
        
        if region._module.get_park_status == None:
            statuses = {}
            for id in range(len(names)):
                statuses[id] = None
        
        if region._module.get_park_status == True:
            statuses = {}
            tfdict = create_tf_relation()

            for id in range(len(names)):
                
                statuses[id] = True
                if tfdict[id]:
                    if tfdict.is_open == False:
                        statuses[id] = False
                


    if region_json["hasUplifts"]:
        if region_json["includes"]["liftStatus"]:
            region._class.lift_is_open = region._module.get_lift_status()
        else:
            region._class.lift_is_open = None

    if region_json["includes"]["parkStatus"]:
        region._class.park_is_open = region._module.get_park_status()
    else:
        region._class.park_is_open = None
