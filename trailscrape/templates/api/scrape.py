import re, requests
import json

from selenium import webdriver
from bs4 import BeautifulSoup
import time
import os
from . import routes

from difflib import get_close_matches
from .modules.scrapers.common import trailforks

def get_soup(region_data):
    if region_data["scrapeWithDriver"]:
        options = webdriver.ChromeOptions()
        options.add_argument("headless")
        driver = webdriver.Chrome(options=options)
        driver.get(region_data["url"])
        time.sleep(2)
        soup = BeautifulSoup(driver.page_source, "html.parser")
        driver.close()

    else:
        content = requests.get(region_data["url"])
        soup = BeautifulSoup(content.text, "html.parser")

    return soup



def scrape(region_data):
    
    scraper_module = routes.route()[region_data["moduleID"]]
    soup = get_soup(region_data)
    
    curr_region = {
        "name": region_data["name"]
    }
    
    tf_trails = trailforks.scrape(region_data["trailforksRegionID"])
    tf_trail_names = [trail["name"] for trail in tf_trails]

    if region_data["includes"]["trails"]["name"] or region_data["includes"]["trails"]["status"] or region_data["includes"]["trails"]["grade"]:
        curr_region["trails"] = scraper_module.get_trails(soup)

        for trail in curr_region["trails"]:
            matches = get_close_matches(trail["name"], tf_trail_names)
            if matches:
                match = matches[0]
                tf_trails[tf_trail_names.index(match)]["id"] = trail["id"]

    else:
        curr_region["trails"] = tf_trails

    # list trails by their trailforks update trailStatus
    if not region_data["includes"]["trails"]["grade"]:
        for trail in curr_region["trails"]:
            for tf_trail in tf_trails:
                if trail["id"] == tf_trail["id"]:
                    trail["grade"] = tf_trail["grade"]

    if region_data["includes"]["trails"]["status"] and region_data["includes"]["park"]["parkStatus"]:
        curr_region["parkIsOpen"] = parkStatus

    # if website contains trailStatus but not parkStatus:
    if region_data["includes"]["trails"]["status"] and not region_data["includes"]["park"]["parkStatus"]:
        curr_region["parkIsOpen"] = False

        # if any track is marked as open:
        for trail in curr_region["trails"]:
            if trail["isOpen"]:
                # park is open
                curr_region["parkIsOpen"] = True

        # else: park is closed

    # if website contains parkStatus but not trailStatus:
    if not region_data["includes"]["trails"]["status"] and region_data["includes"]["park"]["parkStatus"]:
        
        # if the park is closed:
        if scraper_module.get_park_status(soup) == False:
            for trail in curr_region["trails"]:
                # all trails are closed
                trail["isOpen"] = False
        
        if scraper_module.get_park_status(soup) == None:
            for trail in curr_region["trails"]:
                trail["isOpen"] = None
        
        # else:
        if scraper_module.get_park_status(soup) == True:
            # trails are open except trails that have been updated as 'closed' on trailforks.
            for trail in curr_region["trails"]:
                for tf_trail in tf_trails:
                    if trail["id"] == tf_trail["id"]:
                        trail["status"] = tf_trail["isOpen"]

    # if website contains neither parkStatus or trailStatus:
    if not region_data["includes"]["trails"]["status"] and not region_data["includes"]["park"]["parkStatus"]:
        curr_region["parkIsOpen"] = False
        for trail in curr_region["trails"]:
            if trail["isOpen"]:
                # if the park is open on trailforks ### TODO ###
                # list trails by their trailforks update trailStatus
                curr_region["parkIsOpen"] = True

        # if the park is closed on trailforks: ### TODO ###
        # all trails are closed
        if curr_region["parkIsOpen"] == False:
            pass

    if region_data["hasUplifts"]:
        if region_data["includes"]["park"]["liftStatus"]:
            curr_region["lift_is_open"] = scraper_module.get_lift_status(soup)
        else:
            curr_region["lift_is_open"] = None

    if region_data["includes"]["park"]["parkStatus"]:
        curr_region["park_is_open"] = scraper_module.get_park_status(soup)
    else:
        curr_region["park_is_open"] = None

    return curr_region
