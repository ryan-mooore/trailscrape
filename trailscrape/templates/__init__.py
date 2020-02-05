from flask import Flask
import json

app = Flask(__name__,
     static_folder="./public",
     template_folder="./static")


from templates.main.views import main_blueprint
from templates.api.views import api

app.register_blueprint(main_blueprint)
app.register_blueprint(api, url_prefix='/api')