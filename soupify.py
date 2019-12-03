from bs4 import BeautifulSoup
import re, requests

def create_soup(url):
    try:
        content = requests.get(url)
        return BeautifulSoup(content.text, features="html.parser")
    except:
        raise Exception("RequestError 4xx")

def parse(regex, element):
    return re.match(regex, element).groups()