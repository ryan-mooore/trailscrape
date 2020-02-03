from flask import Flask

from scrapers import craigieburn

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello():
    return None

@app.route('/api', methods=['GET'])
def api_all():
    return craigieburn.run()

app.run()
"""
CAP
#web grading > tf grading
#web status > tf status

cap.scrape()

f
SKYLINE QUEENSTOWN
#web grading > tf grading
#web status > tf status

skyline.scrape("queenstown")


SKYLINE ROTORUA
#web grading > tf grading

skyline.scrape("rotorua")

CRAIGIEBURN
tf grading
#web status > tf status

"""
craigieburn.run()
#todo - grading integration with trailforks

"""
TRAILFORKS

trailforks.scrape("area")
"""