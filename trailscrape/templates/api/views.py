from flask import render_template, Blueprint, request
import json
from .modules.scrapers.common import routes

data_funcs = routes.route()
regions = []

for call in data_funcs:
    regions.append(json.loads(call()))

api = Blueprint('api', __name__)


@api.route('/', methods=["GET"])
def get_region():

    region_json = json.dumps({"regions": regions, "error": False})

    return region_json