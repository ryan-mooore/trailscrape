import re

grade_helper = [
    None, 
    "BEGINNER",
    "INTERMEDIATE",
    None,
    "ADVANCED",
    "EXPERT",
    None
]

def get_trails(soup):
    
    trails = []
    trail_id = 0
    # Iteration #
    table = soup.find("div", {"class" : "trail-status-list"})
    for row in table.find_all("div", {"class" : "list-item"})[1:]:

        # Name #
        name = row.find("div", {"class" : "tract-name"}).string.title()

        # Grade #
        raw_grade = row.find("div", {"class" : "track-level" }).img.get("alt")
        
        res = re.match(r"(\b(?!\bHiking*\b)\w+\b)", raw_grade)
        if res:
            grade = grade_helper.index(res.groups()[0].upper()) + 1
        else:
            grade = None

        # Status #
        raw_status = row.find("div", {"class" : "tract-status"}).img.get("alt").upper()

        status = None

        if raw_status == "OPEN":
            status = True

        if raw_status == "CLOSED":
            status = False

        # Return #
        trails.append({
            "id": trail_id,
            "name": name,
            "grade": grade,
            "isOpen": status
        })

        trail_id += 1

    return trails