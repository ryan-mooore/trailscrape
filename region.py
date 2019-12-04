import re, requests

from bs4 import BeautifulSoup
import dryscrape

def create_soup(url, dynamic=False):
    try:
        if dynamic:
            content = dryscrape.Session()
            content.visit(url)
            return BeautifulSoup(content.body(), "lxml")
        else:
            content = requests.get(url)
            return BeautifulSoup(content.text, "html.parser")
    except:
        raise Exception("RequestError 4xx")

def parse(regex, element):
    res = re.match(regex, element)
    if res:
        return res.groups()
    return False

class Trail:
    def __init__(self, name, grade, status):
        self.name = name
        self.grade = grade
        self.status = status