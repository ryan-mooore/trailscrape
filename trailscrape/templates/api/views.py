from flask import render_template, Blueprint, request
import json
from . import routes
from . import scrape

sroutes = routes.route()

with open("trailscrape/templates/api/regions.json") as regions_f:
    regions = json.loads(regions_f.read())
    regions_f.close()

regions_json = []
for region in regions:
    try:
        regions_json.append(scrape.scrape(region))
    except Exception as e:
        print(f"Exception on module {region['moduleID']} \n {e}")

api = Blueprint('api', __name__)

@api.route('/', methods=["GET"])
def get_region():

    region_json = json.dumps({"regions": regions_json, "error": False})
    return region_json