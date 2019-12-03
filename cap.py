import soupify

def scrape():
    soup = soupify.create_soup("https://www.christchurchadventurepark.com/trail-information")

    trails = {}
    trail_id = "tract-name"
    current_trail = soup.find()

    total_trails = len(soup.find_all("div", class_ = trail_id))

    for _ in range(total_trails):
        current_trail = current_trail.find_next("div", class_ = trail_id)
        name = current_trail.next_element
        status = soupify.parse(
            r".+\/([a-z]+)\.svg", 
            current_trail.next_sibling.next_sibling.img.get("src")
            )[0]
        trails[name] = status

    return trails