import re
import region

import os, ssl
if (not os.environ.get('PYTHONHTTPSVERIFY', '') and
getattr(ssl, '_create_unverified_context', None)):
    ssl._create_default_https_context = ssl._create_unverified_context

ccc_soup = region.create_soup(
    "https://www.ccc.govt.nz/transport/cycling/find-a-ride/trackstatus/", 
    "dynamic")

tf_soup = region.create_soup("https://www.trailforks.com/region/victoria-park/trails/")

trails = []

#scrape trails and status and add to dictionary

trail_list = ccc_soup.find("iframe")
print(trail_list)
current_trail = tf_soup.find()
'''
for _ in range(total_trails):
    current_trail = current_trail.find_next("td", class_ = trail_id)
    trails[current_trail.a.next_element] = "idk"
print(trails)
'''