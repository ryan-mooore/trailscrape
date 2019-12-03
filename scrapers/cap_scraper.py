import re
import soupify

def parse_status_div(div):
    src = status.img.get("src")
    res = re.search(r".\/open.svg", src)
    try:
        res.string; return "open"
    except:
        res = re.search(r".\/closed.svg", src)
        try:
            res.string; return "closed"
        except: raise Exception("statusError")

soup = soupify.create_soup("https://www.christchurchadventurepark.com/trail-information")

trails = {}

#scrape trails and status and add to dictionary
trail_id = "tract-name"

total_trails = len(soup.find_all("div", class_ = trail_id))
current_trail = soup.find()

for _ in range(total_trails):
    current_trail = current_trail.find_next("div", class_ = trail_id)
    status = current_trail.next_sibling.next_sibling
    trails[current_trail.next_element] = parse_status_div(status)

print(trails)
