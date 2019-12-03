import soupify


region = "queenstown-bike-park-4524"
soup = soupify.create_soup("https://www.trailforks.com/region/{}/status".format(region))

trails = {}
trail_id = "row"
current_trail = soup.find("tr")

total_trails = len(soup.find_all("tr"))
print(total_trails)

for _ in range(total_trails - 2):
    current_trail = current_trail.find_next("a", class_="green hovertip")
    name = current_trail.next_element
    status = current_trail.find_next("span").get("title")
    if status == "Closed / Red":
        status = "closed"
    else:
        status = "open"
    trails[name] = status
print(trails)
