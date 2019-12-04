from bs4 import BeautifulSoup
import re, requests

def create_soup(url):
    try:
        content = requests.get(url)
        return BeautifulSoup(content.text, features="html.parser")
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
