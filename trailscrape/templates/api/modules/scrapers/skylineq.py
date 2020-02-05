import re
from .common import classes

def run():
    skylineq = classes.Region()

    skylineq.create_soup("https://www.skyline.co.nz/en/queenstown/things-to-do/"
                        "queenstown-mountain-biking/mountain-bike-park-info/")
    
    #find table after h2
    try:
        trail_list = skylineq.soup.find(
            "h2",
            text=re.compile(r"Mountain Bike Trails")
        ).find_next("ul")

    except AttributeError:
        raise ConnectionError("Website could not be reached")

    for row in trail_list.find_all("li"):
        name_and_status = row.find_all("div")[0].h3.string
        #strip weird punctuation
        name_and_status = re.sub(r"[\"“”]", "", name_and_status)

        #this is kinda fucked because its a mess of spans and divs
        #so i had to do some weird shit
        grade = row.find_all("div")[1].find_all("strong")[-1]

        grade = grade.next_sibling

        #name and status are on one line e.g. (Hammy's Track) - (OPEN)
        #except sometimes its FUCKED UP sjhdkjahsdkj
        try:
            (parsed_name, status) = skylineq.parse(
                r"(.+)\s-\s+([A-Za-z]+)",
                name_and_status
            )
        except:
            (parsed_name, status) = skylineq.parse(
                r"([A-Z].+)\s([A-Z])",
                name_and_status
            )

        #more weird shit cause sometimes a span is scraped
        if not type(grade) == str:
            grade = grade.string
        
        parsed_grade = skylineq.parse(r".*([1-6])", grade)
        
        if parsed_grade:
            parsed_grade = parsed_grade[0]
        else:
            parsed_grade = -1

        parsed_status = not status.upper() == "CLOSED"
        
        skylineq.trail_status.append(classes.Trail(parsed_name, parsed_grade, parsed_status))
    
    #convert to json
    return skylineq.json_encode()