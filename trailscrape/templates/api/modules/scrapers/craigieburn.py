from .common import classes

def run():
    craigieburn = classes.Region()
    craigieburn.create_soup(
        "https://www.craigieburntrails.org.nz/track-status/",
        True
    )

    try:
        trail_list = craigieburn.soup.find("table", {"id" : "trackStatus"})

    except AttributeError:
        raise ConnectionError("Website could not be reached")

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
        craigieburn.trail_status.append(classes.Trail(parsed_name, None, parsed_status))

    craigieburn.park_status = "closed"
    for trail in craigieburn.trail_status:
        if not trail.is_open:
            continue
        craigieburn.park_status = "open"

    return craigieburn.json_encode()