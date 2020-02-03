from scrapers.common import common

def run():
    craigieburn = common.Region()
    craigieburn.create_soup(
        "https://www.craigieburntrails.org.nz/track-status/",
        True
    )


    trail_list = craigieburn.soup.find("table", {"id" : "trackStatus"})
    for row in (trail_list.find_all("tr")):
        #skip table header
        if row.th:
            continue
        name   = row.find_all("td")[0].a.string
        status = row.find_all("td")[1].img.get("src")

        parsed_name = name

        #closed-icon or open-icon
        parsed_status = craigieburn.parse(
            r".+\/(\w+)-icon.png",
            status
        )[0]

        #trail grading can not be found on the website so none is used
        craigieburn.trail_status.append(common.Trail(parsed_name, None, parsed_status))

    craigieburn.park_status = "closed"
    for trail in craigieburn.trail_status:
        if not trail.is_open:
            continue
        craigieburn.park_status = "open"

    return craigieburn.json_encode()