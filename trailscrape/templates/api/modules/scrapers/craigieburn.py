from .common import classes

def run():
    try:
        craigieburn = classes.Region()
        craigieburn.name = "Craigieburn Trails"

        craigieburn.create_soup(
            "https://www.craigieburntrails.org.nz/track-status/",
            True
        )

        craigieburn.park_is_open = False
        craigieburn.lift_is_open = None

        trail_list = craigieburn.soup.find("table", {"id" : "trackStatus"})

        for row in (trail_list.find_all("tr")):
            #skip table header
            if row.th:
                continue
            name = row.find_all("td")[0].a.string
            status_src = row.find_all("td")[1].img.get("src")

            parsed_name = name

            #closed-icon or open-icon
            status = craigieburn.parse(
                r".+\/(\w+)-icon.png",
                status_src
            )[0].upper()

            parsed_status = None

            if status == "OPEN":
                parsed_status = True
                craigieburn.park_is_open == True
            
            if status == "CLOSED":
                parsed_status = False


            #trail grading can not be found on the website so none is used
            craigieburn.trails.append(classes.Trail(parsed_name, None, parsed_status))

        return craigieburn.json_encode()

    except Exception as e:
        print("craigieburn:", e)
        return "{}"