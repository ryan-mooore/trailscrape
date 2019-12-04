import region

def scrape(area):
    soup = region.create_soup(
        "https://www.trailforks.com/region/{}/status".format(area)
    )

    trails = []
    #find table by section id
    trail_list = soup.find("section", {"id" : "main"})\
                    .find_all("div")[1]\
                        .table\
                            .tbody

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
        parsed_grade = region.parse(
            r"(?:(.+)\s\/.+|(.+):\s.+)|,\s(.+)",
            grade
        )

        #as there are 3 capture groups filter to the valid one
        if parsed_grade:
            parsed_grade = filter(None, parsed_grade)
            for result in parsed_grade: parsed_grade = grades.index(result)
        else:
            parsed_grade = -1
        
        parsed_status = not status == "Closed / Red"
        
        trails.append(region.Trail(parsed_name, parsed_grade, parsed_status))

    return trails

area = "queenstown-bike-park-4524"
scraped_data = scrape(area)
for data in scraped_data:
    print(data.name, data.grade, data.status)