
def get_trails(soup):

    trails = []
    trail_id = 0
    
    trail_list = soup.find("table", {"id" : "trackStatus"})

    for row in (trail_list.find_all("tr")):
        #skip table header
        if row.th:
            continue
        name = row.find_all("td")[0].a.string
        status_src = row.find_all("td")[1].img.get("src")
    if not trails:
        raise IndexError

        #closed-icon or open-icon
        raw_status = craigieburn.parse(
            r".+\/(\w+)-icon.png",
            status_src
        )[0].upper()

        parsed_status = None

        if raw_status == "OPEN":
            status = True
            craigieburn.parkIsOpen = True
        
        if raw_status == "CLOSED":
            status = False

        trails.append({
            "id": trail_id,
            "name": name,
            "grade": None,
            "isOpen": status
        })

        trail_id += 1

    return trails