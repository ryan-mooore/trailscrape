import region

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

        #closed-icon or open-icon
        parsed_status = region.parse(
            r".+\/(\w+)-icon.png",
            status
        )[0]

        #trail grading can not be found on the website so none is used
        trails.append(region.Trail(parsed_name, None, parsed_status))

    #convert to json
    return region.json_encode(trails)