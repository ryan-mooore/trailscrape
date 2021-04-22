from bs4 import BeautifulSoup
import re, requests

def get_table(region_id):
    url = f"https://www.trailforks.com/region/{region_id}/status"
    content = requests.get(url)
    soup = BeautifulSoup(content.text, "html.parser")
    try:
        return soup.find("section", {"id" : "main"})\
                    .find_all("div")[1]\
                        .table\
                            .tbody
    except AttributeError:
        raise ConnectionError("Website could not be reached")

def scrape(region_id):
    grade_helper = [
        "EASIEST",
        "EASY", 
        "INTERMEDIATE",
        "ADVANCED",
        "VERY DIFFICULT",
        "EXTREMELY DIFFICULT",
        "PROS ONLY"
    ]

    trails = []

    table = get_table(region_id)
    id = 0

    for row in table.find_all("tr"):
        name = row.find_all("td")[1].a.string

        raw_grade = row.find_all("td")[0].span.get("title").upper()
        res = re.match(r"(?:(.+)\s\/.+|(.+):\s.+)|,\s(.+)", raw_grade)
        if res:
            grade = filter(None, res.groups())
            for result in grade: grade = grade_helper.index(result) + 1
        else:
            grade = None

        raw_status = row.find_all("td")[2].span.get("title").upper()
        status = raw_status is not "CLOSED / RED"

        trails.append({
            "id": id,
            "name": name,
            "grade": grade,
            "isOpen": status
        })
        id += 1

    return trails