import soupify

def scrape():
    soup = soupify.create_soup("https://www.craigieburntrails.org.nz/tracks/")

    trails = {}
    trail_id = ""
    current_trail = soup.find()

    total_trails = soup.find(id = "trackStatus")

    print(total_trails)

    for _ in range(total_trails):
        current_trail = current_trail.find_next("div", class_ = trail_id)
        name = current_trail.next_element
        status = soupify.parse(
            r".+\/([a-z]+)\.svg", 
            current_trail.next_sibling.next_sibling.img.get("src")
            )[0]
        trails[name] = status

    return trails