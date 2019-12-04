from flask import Flask
import requests

import cap, skyline, craigieburn, trailforks

app = Flask(__name__)

@app.route('/')
def hello():
    return "{}{}".format(cap.scrape(), qbp.scrape())

"""
CAP
#web grading > tf grading
#web status > tf status
"""
cap.scrape()

"""
SKYLINE QUEENSTOWN
#web grading > tf grading
#web status > tf status
"""
skyline.scrape("queenstown")

"""
SKYLINE ROTORUA
#web grading > tf grading
#web status > tf status
"""
skyline.scrape("rotorua")

"""
CRAIGIEBURN
#tf grading
#web status > tf status
"""
craigieburn.scrape()
#todo - grading integration with trailforks

"""
TRAILFORKS
"""
trailforks.scrape("area")
