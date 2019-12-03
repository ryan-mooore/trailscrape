from flask import Flask
import cap, qbp
import requests
app = Flask(__name__)


@app.route('/')
def hello():
    return "{}{}".format(cap.scrape(), qbp.scrape())