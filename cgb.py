import region
import sys
import dryscrape

def scrape():
    soup = region.create_soup(
        "https://www.craigieburntrails.org.nz/track-status/",
        "dynamic"
    )

    trails = []

    trail_list = soup.find("table", {"id" : "trackStatus"})

    for row in trail_list.find_all("tr"):
        #skip table header
        if row.th:
            continue
        name   = row.find_all("td")[0].a.string
        status = row.find_all("td")[1].img.get("src")

        parsed_name = name

        parsed_status = region.parse(
            r".+\/(\w+)-icon.png",
            status
        )[0]
        
        trails.append(region.Trail(parsed_name, None, parsed_status))

    return trails

scraped_data = scrape()
for data in scraped_data:
    print(data.name, data.grade, data.status)