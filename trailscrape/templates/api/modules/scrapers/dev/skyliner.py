import re
from .common import classes

def run():
    skyliner = classes.Region()

    skyliner.create_soup("https://www.skyline.co.nz/en/rotorua/things-to-do/" 
                        "rotorua-mountain-biking/rotorua-mountain-bike-park-info/")
 
    #find table after h2
    try:
        trail_list = skyliner.soup.find(
            "h2",
            text=re.compile(r"Trail Information")
        ).find_next("ul")

    except AttributeError:
        raise ConnectionError("Website could not be reached")

    #grade numeric conversion from strings - as skyliner rotorua uses IMBA
    # trail grades, certain fields are null for NZ only grades
    grades = [None, "Beginner", "Intermediate",\
              None, "Advanced", "Expert", None]

    for row in trail_list.find_all("li"):
        name_and_status = row.find_all("div")[0].h3.string
        #strip weird punctuation
        name_and_status = re.sub(r"[\"“”]", "", name_and_status)

        print(name_and_status)
        
        #this is kinda fucked because its a mess of spans and divs
        #so i had to do some weird shit
        grade = row.find_all("div")[1].find_all("strong")[-1]

        try:
            (parsed_name, status) = skyliner.parse(
                r"(.+)\s-\s+([A-Za-z]+)",
                name_and_status
            )
        except:
            (parsed_name, status) = skyliner.parse(
                r"([A-Z].+)\s([A-Z])",
                name_and_status
            )

        #more weird shit cause sometimes a span is scraped
        if not type(grade) == str:
            grade = grade.string
        
        #no grade conversion needed for queenstown
        #as the correct number is already specified
        parsed_grade = skyliner.parse(r".+\s-\s+([A-Z][a-z]+)", grade)
        
        if parsed_grade:
            parsed_grade = parsed_grade[0]
            parsed_grade = grades.index(parsed_grade)
        else:
            parsed_grade = -1
            
        parsed_status = not status.upper() == "CLOSED"

        skyliner.trail_status.append(classes.Trail(parsed_name, parsed_grade, parsed_status))
    
    #convert to json
    return skyliner.json_encode()