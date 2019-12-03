import re
import soupify

import os, ssl
if (not os.environ.get('PYTHONHTTPSVERIFY', '') and
getattr(ssl, '_create_unverified_context', None)):
    ssl._create_default_https_context = ssl._create_unverified_context

ccc_soup = soupify.create_soup("https://www.ccc.govt.nz/transport/cycling/find-a-ride/trackstatus/")
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
