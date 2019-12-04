import region

def scrape():
    soup = region.create_soup("https://www.christchurchadventurepark.com/trail-information")

    trails = []
    trail_list = soup.find("div", {"class" : "trail-status-list"})
    grades = [None, "Beginner", "Intermediate", None, "Advanced", "Expert", None]

    for row in trail_list.find_all("div", {"class" : "list-item"}):
        name   = row.find("div", {"class" : "tract-name"}).string
        grade  = row.find("div", {"class" : "track-level" }).img.get("alt")
        status = row.find("div", {"class" : "tract-status"}).img.get("alt")

        parsed_name = name.title()

        parsed_grade = region.parse(r"(\b(?!\bHiking\b)\w+\b)", grade)
        if parsed_grade:
            print(parsed_grade)
            parsed_grade = grades.index(parsed_grade[0])
        else:
            parsed_grade = -1

        parsed_status = not status == "Closed"

        trails.append(region.Trail(parsed_name, parsed_grade, parsed_status))
    return trails

scraped_data = scrape()
for data in scraped_data:
    print(data.name, data.grade, data.status)