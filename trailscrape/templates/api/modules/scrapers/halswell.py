from .common import trailforks, classes
import re

def run():
    try:
        ccc = classes.Region()
        ccc.name = "Halswell Quarry"

        ccc.create_soup(
            "https://trackstatus.co.nz/", 
            "dynamic")

        span = ccc.soup.find("span",
            text=re.compile(r"Crocodile MTB Trails"))

        status = span.parent.parent.parent.parent.parent['class'][0]
        status = status.upper()

        
        if status.endswith("OPEN"):
            ccc.park_is_open = True
        if status.endswith("CLOSED"):
            ccc.park_is_open = False

        trail_list = trailforks.scrape("crocodile-xc-mtb-park")

        for trail in trail_list:
            ccc.trails.append(
                classes.Trail(
                    trail.name,
                    trail.grade, 
                    ccc.park_is_open #if park is open, trails are open
                )
            )
        
        return ccc.json_encode()

    except Exception as e:
        print("halswell", e)
        return "{}"