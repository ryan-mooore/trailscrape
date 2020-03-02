import re, requests
import json

from selenium import webdriver
from bs4 import BeautifulSoup
import time

class Trail:
    def __init__(self, name, grade, status):
        self.name = name
        self.grade = grade
        self.is_open = status

    def reprJSON(self):
        return dict(
            name=self.name,
            grade=self.grade,
            is_open=self.is_open
        ) 

class RegionHelper:
    def __init__(self, _json, _tfdata, _class, scraper_module):
        self._json = _json
        self._tfdata = _tfdata
        self._class = _class
        self._module = scraper_module

class Region:
    def __init__(self):
        self.name = None
        self.park_is_open = None
        self.lift_is_open = None
        self.trails = []

    def reprJSON(self):
        return dict(
            name=self.name,
            park_is_open=self.park_is_open,
            lift_is_open=self.lift_is_open,
            trails=self.trails
        )
        
    def json_encode(self):
        return json.dumps(self, default=lambda obj: obj.reprJSON())

    def parse(self, regex, element):
        res = re.match(regex, element)
        if res:
            return res.groups()
        return False

