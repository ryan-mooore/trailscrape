import importlib
import logging
import time
from datetime import datetime
from difflib import get_close_matches
from types import SimpleNamespace
from typing import Dict

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

from documents import documents
from scrapers.common import trailforks

logging.basicConfig(level=20)


def init_driver() -> webdriver.Chrome:
    options = webdriver.ChromeOptions()
    options.add_argument("headless")
    return webdriver.Chrome(ChromeDriverManager().install(), options=options)


def get_soup(region, driver):
    if region.scrapeWithDriver:
        driver.get(region.url)
        time.sleep(2)
        soup = BeautifulSoup(driver.page_source, "html.parser")

    else:
        content = requests.get(region.url)
        soup = BeautifulSoup(content.text, "html.parser")
    return soup


def create_status(region, region_status, driver) -> Dict:

    scraper_module = importlib.import_module(
        "scrapers." + region.ID)

    soup = get_soup(region, driver)

    tf_trails = trailforks.scrape(region.trailforksRegionID)
    tf_trail_names = [trail["name"] for trail in tf_trails]

    region_status.parkIsOpen = True

    if region.includes["trails"]["name"] or region.includes["trails"]["grade"] or region.includes["trails"]["status"]:
        region_status.trails = scraper_module.get_trails(soup)

        for trail in region_status.trails:
            matches = get_close_matches(trail["name"], tf_trail_names)
            if matches:
                match = matches[0]
                tf_trails[tf_trail_names.index(match)]["id"] = trail["id"]

    else:
        region_status.trails = tf_trails

    # list trails by their trailforks update trailStatus
    if not region.includes["trails"]["grade"]:
        for trail in region_status.trails:
            for tf_trail in tf_trails:
                if trail["id"] == tf_trail["id"]:
                    trail["grade"] = tf_trail["grade"]

    if region.includes["trails"]["status"] and region.includes["park"]["parkStatus"]:
        region_status.parkIsOpen = scraper_module.get_park_status(soup)

    # if website contains trailStatus but not parkStatus:
    if region.includes["trails"]["status"] and not region.includes["park"]["parkStatus"]:
        region_status.parkIsOpen = False
        # if any track is marked as open:
        for trail in region_status.trails:
            if trail["isOpen"]:
                # park is open
                region_status.parkIsOpen = True
        # else: park is closed

    # if website contains parkStatus but not trailStatus:
    if not region.includes["trails"]["status"] and region.includes["park"]["parkStatus"]:

        # if region.the park is closed:
        if scraper_module.get_park_status(soup) == False:
            for trail in region_status.trails:
                # all trails are closed
                trail["isOpen"] = False

        if scraper_module.get_park_status(soup) == None:
            for trail in region_status.trails:
                trail["isOpen"] = None

        # else:
        if scraper_module.get_park_status(soup) == True:
            # region. trails are open except trails that have been updated as 'closed' on trailforks.
            for trail in region_status.trails:
                for tf_trail in tf_trails:
                    if trail["id"] == tf_trail["id"]:
                        trail["status"] = tf_trail["isOpen"]

    # if websregion.ite contains neither parkStatus or trailStatus:
    if not (region.includes["trails"]["status"] or region.includes["park"]["parkStatus"]):
        region_status.parkIsOpen = False
        for trail in region_status.trails:
            if trail["isOpen"]:
                # if the park is open on trailforks ### TODO ###
                # list trails by their trailforks update trailStatus
                region_status.parkIsOpen = True

        # if the park is closed on trailforks: ### TODO ###
        # all trails are closed
        if region_status.parkIsOpen == False:
            pass

    if region.hasUplifts:
        if region.includes["park"]["liftStatus"]:
            region_status.liftIsOpen = scraper_module.get_lift_status(
                soup)
        else:
            region_status.liftIsOpen = None
    return region_status


totaljson = []

if __name__ == "__main__":

    driver = init_driver()

    logging.info("Starting scrape...")
    logging.info(datetime.now())

    for region in documents.Region.objects:
        try:
            region_status = documents.RegionStatus.objects(ID=region.ID)[0]
            region_status.scrapeError = False
        except IndexError:
            region_status = documents.RegionStatus(
                ID=region.ID, scrapeError=False)

        try:
            region_status = create_status(region, region_status, driver)
            logging.info(f"Scraped {region.name}")
        except Exception as e:
            print(f"Error while scraping {region.name}: {e}")
            region_status.scrapeError = True
        region_status.save()

    driver.close()
