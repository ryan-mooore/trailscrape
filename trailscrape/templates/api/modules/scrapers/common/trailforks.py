from . import classes

def scrape(region_name):
    tf_region = classes.Region()
    tf_region.create_soup(
        f"https://www.trailforks.com/region/{region_name}/status"
    )

    trails = []
    #find table by section id
    try:
        trail_list = tf_region.soup.find("section", {"id" : "main"})\
                    .find_all("div")[1]\
                        .table\
                            .tbody
    except AttributeError:
        raise ConnectionError("Website could not be reached")

    #grade numeric conversion from strings
    grades = ["Easiest", "Easy", "Intermediate", "Advanced",\
              "Very Difficult", "Extremely Difficult", "pros only"]
    
    for row in trail_list.find_all("tr"):
        name   = row.find_all("td")[1].a.string
        grade  = row.find_all("td")[0].span.get("title")
        status = row.find_all("td")[2].span.get("title")

        parsed_name = name

        #pretty conusing regex because the difficulties have different
        #sentence structure using a combination of / , : , -
        parsed_grade = tf_region.parse(
            r"(?:(.+)\s\/.+|(.+):\s.+)|,\s(.+)",
            grade
        )

        #as there are 3 capture groups filter to the valid one
        if parsed_grade:
            parsed_grade = filter(None, parsed_grade)
            for result in parsed_grade: parsed_grade = grades.index(result) + 1
        else:
            parsed_grade = -1
        
        parsed_status = not status == "Closed / Red"
        
        trails.append(classes.Trail(parsed_name, parsed_grade, parsed_status))

    return trails