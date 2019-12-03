import soupify

def scrape():
    soup = soupify.create_soup("https://www.skyline.co.nz/en/queenstown/things-to-do/queenstown-mountain-biking/mountain-bike-park-info/")

    trails = {}
    trail_id = "c-accordion__header-title"
    current_trail = soup.find()

    total_trails = len(soup.find_all("h3", class_ = trail_id))

    for _ in range(total_trails) :
        current_trail = current_trail.find_next("h3", class_ = trail_id)
        (name, status) = soupify.parse(
            r'([A-Z].+) - +([A-Z]+)',
            current_trail.text
            )
        trails[name] = status.lower()
        
    return trails