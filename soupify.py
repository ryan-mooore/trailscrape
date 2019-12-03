from bs4 import BeautifulSoup
import re, requests

def create_soup(url):
    content = requests.get(url)
    return BeautifulSoup(content.text, features="html.parser")