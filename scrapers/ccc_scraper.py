import re
import soupify

ccc_soup = soupify.create_soup("https://www.seasonofcycling.co.nz/service/mountain/track-status/")
tf_soup = soupify.create_soup("https://www.trailforks.com/region/victoria-park/trails/")

trails = {}

#scrape trails and status and add to dictionary
trail_id = "highlight"

total_trails = len(tf_soup.find_all("td", class_ = trail_id))
current_trail = tf_soup.find()

for _ in range(total_trails):
    current_trail = current_trail.find_next("td", class_ = trail_id)
    trails[current_trail.a.next_element] = "idk"
print(trails)
