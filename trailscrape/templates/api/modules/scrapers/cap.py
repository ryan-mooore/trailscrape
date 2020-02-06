from .common import classes

def run():
    try:
        cap = classes.Region()
        cap.name = "Christchurch Adventure Park"

        cap.create_soup(
            "https://www.christchurchadventurepark.com/trail-information"
        )

        #find table by div class

        cap.park_is_open = False
        cap.lift_is_open = False

        trail_list = cap.soup.find("div", {"class" : "trail-status-list"})

        #grade numeric conversion from strings - as CAP uses IMBA trail grades,
        #certain fields are null for NZ only grades e.g blue advanced, easiest etc.
        grades = [None, "BEGINNER", "INTERMEDIATE",\
                None, "ADVANCED", "EXPERT", None]

        for row in trail_list.find_all("div", {"class" : "list-item"}):
            name   = row.find("div", {"class" : "tract-name"}).string
            grade  = row.find("div", {"class" : "track-level" }).img.get("alt")
            status = row.find("div", {"class" : "tract-status"}).img.get("alt")

            status = status.upper()
            parsed_name = name.title()

            #regex gets the first word of possible multi-word description
            #and does not match if the word is hiking (hiking trail)
            parsed_grade = cap.parse(r"(\b(?!\bHiking*\b)\w+\b)", grade)
            
            if parsed_grade:
                parsed_grade = grades.index(parsed_grade[0].upper())
            else:
                parsed_grade = None

            parsed_status = None

            if status == "OPEN":
                parsed_status = True
                cap.lift_is_open = True
                cap.park_is_open = True
            
            if status == "CLOSED":
                parsed_status = False

            cap.trails.append(classes.Trail(parsed_name, parsed_grade, parsed_status))
        
        return cap.json_encode()

    except Exception as e:
        print("cap:", e)
        return "{}"