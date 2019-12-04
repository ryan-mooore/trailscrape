import re, region

def scrape():
    soup = region.create_soup("https://www.skyline.co.nz/en/queenstown/things-to-do/queenstown-mountain-biking/mountain-bike-park-info/")

    trails = []
    trail_list = soup.find("h2", text=re.compile(r"Mountain Bike Trails")).find_next("ul")

    for row in trail_list.find_all("li"):
        name_and_status = row.find_all("div")[0].h3.string
        grade           = row.find_all("div")[1].div.find_all("p")[-1].find_all("strong")[1].next_sibling

        (parsed_name, status) = region.parse(
            r"([A-Z].+) - +([A-Z]+)",
            name_and_status
        )

        print(grade)
        if not type(grade) == str:
            grade = grade.string
        parsed_grade = region.parse(r"([1-6])", grade)
        
        if parsed_grade:
            parsed_grade = parsed_grade[0]
        else:
            parsed_grade = -1

        parsed_status = not status == "CLOSED"

        trails.append(region.Trail(parsed_name, parsed_grade, parsed_status))
        
    return trails

scraped_data = scrape()
for data in scraped_data:
    print(data.name, data.grade, data.status)