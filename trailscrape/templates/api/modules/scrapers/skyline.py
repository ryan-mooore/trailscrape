import re
from common import common

def scrape(area):
    if area == "queenstown":
        url = ("https://www.skyline.co.nz/en/queenstown/things-to-do/"
              "queenstown-mountain-biking/mountain-bike-park-info/")
    elif area == "rotorua":
        url = ("https://www.skyline.co.nz/en/rotorua/things-to-do/"
              "rotorua-mountain-biking/rotorua-mountain-bike-park-info/")
    else:
        raise Exception("RequestError 4xx")

    soup = region.create_soup(url)

    trails = []

    #find table after h2
    trail_list = soup.find(
        "h2",
        text=re.compile(r"Mountain Bike Trails|Trail Status")
    ).find_next("ul")

    #grade numeric conversion from strings - as skyline rotorua uses IMBA
    # trail grades, certain fields are null for NZ only grades
    grades = [None, "Beginner", "Intermediate",\
              None, "Advanced", "Expert", None]

    for row in trail_list.find_all("li"):
        name_and_status = row.find_all("div")[0].h3.string
        #strip weird punctuation
        name_and_status = re.sub(r"[\"“”]", "", name_and_status)

        #this is kinda fucked because its a mess of spans and divs
        #so i had to do some weird shit
        grade = row.find_all("div")[1].find_all("strong")[-1]

        #rotorua and queenstwon are formatted slightly differently
        if area == "queenstown": grade = grade.next_sibling

        #name and status are on one line e.g. (Hammy's Track) - (OPEN)
        #except sometimes its FUCKED UP sjhdkjahsdkj
        try:
            (parsed_name, status) = region.parse(
                r"(.+)\s-\s+([A-Za-z]+)",
                name_and_status
            )
        except:
            (parsed_name, status) = region.parse(
                r"([A-Z].+)\s([A-Z])",
                name_and_status
            )

        #more weird shit cause sometimes a span is scraped
        if not type(grade) == str:
            grade = grade.string
        
        #no grade conversion needed for queenstown
        #as the correct number is already specified
        if area == "queenstown":
            parsed_grade = region.parse(r".*([1-6])", grade)
            
            if parsed_grade:
                parsed_grade = parsed_grade[0]
            else:
                parsed_grade = -1
        #otherwise grade conversion is needed (for rotorua)   
        else:
            print(grade)
            parsed_grade = region.parse(r".+\s-\s+([A-Z][a-z]+)", grade)
            
            if parsed_grade:
                parsed_grade = parsed_grade[0]
                parsed_grade = grades.index(parsed_grade)
            else:
                parsed_grade = -1
            
        parsed_status = not status.upper() == "CLOSED"

        trails.append(region.Trail(parsed_name, parsed_grade, parsed_status))
    
    #convert to json
    return region.json_encode(trails)