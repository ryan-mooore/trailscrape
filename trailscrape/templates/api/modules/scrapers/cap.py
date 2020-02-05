from .common import classes

def run():
    cap = classes.Region()
    cap.create_soup(
        "https://www.christchurchadventurepark.com/trail-information"
    )

    #find table by div class
    trail_list = cap.soup.find("div", {"class" : "trail-status-list"})

    #grade numeric conversion from strings - as CAP uses IMBA trail grades,
    #certain fields are null for NZ only grades e.g blue advanced, easiest etc.
    grades = [None, "Beginner", "Intermediate",\
              None, "Advanced", "Expert", None]

    for row in trail_list.find_all("div", {"class" : "list-item"}):
        name   = row.find("div", {"class" : "tract-name"}).string
        grade  = row.find("div", {"class" : "track-level" }).img.get("alt")
        status = row.find("div", {"class" : "tract-status"}).img.get("alt")

        parsed_name = name.title()

        #regex gets the first word of possible multi-word description
        #and does not match if the word is hiking (hiking trail)
        parsed_grade = cap.parse(r"(\b(?!\bHiking\b)\w+\b)", grade)
        
        if parsed_grade:
            parsed_grade = grades.index(parsed_grade[0])
        else:
            parsed_grade = -1

        parsed_status = not status == "Closed"

        cap.trail_status.append(classes.Trail(parsed_name, parsed_grade, parsed_status))
    
    return cap.json_encode()