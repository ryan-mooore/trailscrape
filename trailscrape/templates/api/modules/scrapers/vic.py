from .common import trailforks, classes
import re

def run():
    ccc = classes.Region()

    ccc.create_soup(
        "https://trackstatus.co.nz/", 
        "dynamic")

    span = ccc.soup.find("span",
        text=re.compile(r"Victoria Park Downhill"))

    status = span.parent.parent.parent.parent.parent['class'][0]

    if status == "TwOpen":
        ccc.park_is_open = True
    elif status == "TwClosed":
        ccc.park_is_open = False
    else:
        ccc.park_is_open = True

    trail_list = trailforks.scrape("victoria-park")

    for trail in trail_list:
        ccc.trail_status.append(
            classes.Trail(
                trail.name,
                trail.grade, 
                ccc.park_is_open
            )
        )
    
    return ccc.json_encode()