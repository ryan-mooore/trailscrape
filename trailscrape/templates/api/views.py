from flask import render_template, Blueprint, request
import json
from templates.api.modules.scrapers import cap



api = Blueprint('api', __name__)


@api.route('/', methods=["GET"])
def get_region():

    region_data = cap.run()

    region_json = json.dumps({"region_data": region_data, "error": False})

    return region_json