import re, requests
import json

from bs4 import BeautifulSoup
import dryscrape


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

class Region:
    def __init__(self):
        self.park_is_open = None
        self.lift_is_open = None
        self.trail_status = []

    def reprJSON(self):
        return dict(
            park_is_open=self.park_is_open,
            lift_is_open=self.lift_is_open,
            trail_status=self.trail_status
        )
        
    def create_soup(self, url, dynamic=False):
        try:
            if dynamic:
                content = dryscrape.Session()
                content.visit(url)
                self.soup = BeautifulSoup(content.body(), "lxml")
            else:
                content = requests.get(url)
                self.soup = BeautifulSoup(content.text, "html.parser")
        except:
            raise Exception("RequestError 4xx")
        
    def json_encode(self):
        return json.dumps(self, default=lambda obj: obj.reprJSON())

    def parse(self, regex, element):
        res = re.match(regex, element)
        if res:
            return res.groups()
        return False

