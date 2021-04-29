from json import load
from os import path, environ
from mongoengine import connect
from mongoengine.document import Document
from mongoengine.fields import (BooleanField, DictField, ListField,
                                StringField, URLField)

client = connect(db="trailscrape", host=environ['MONGODB_URI'] if environ['MONGODB_URI'] else 'localhost', port=27017)

class Region(Document):
    ID = StringField(required=True, unique=True, max_length=3)
    name = StringField(required=True)
    url = URLField(required=True)
    trailforksRegionID = StringField(required=True)
    hasUplifts = BooleanField(required=True)
    includes = DictField(required=True)
    scrapeWithDriver = BooleanField(required=True)


class RegionStatus(Document):
    ID = StringField(required=True, unique=True, max_length=3)
    scrapeError = BooleanField(required=True)
    trails = ListField()
    parkIsOpen = BooleanField()
    liftIsOpen = BooleanField()


def create_regions():
    with open(path.join(path.dirname(__file__), '../regions.json'), 'r') as regions:
        for region in load(regions):
            entry = Region(**region)
            entry.save()