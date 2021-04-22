from json import load
from os import path

from mongoengine import connect
from mongoengine.document import Document
from mongoengine.fields import (BooleanField, DictField, ListField,
                                StringField, URLField)

client = connect(db="trailscrape", host="localhost", port=27017)


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
    with open(path.join(path.dirname(__file__), '../db/regions.json'), 'r') as regions:
        for region in load(regions):
            entry = Region(**region)
            entry.save()
