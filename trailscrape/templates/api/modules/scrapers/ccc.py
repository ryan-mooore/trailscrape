from common import common
import re

import os, ssl

ccc = common.Region()

ccc.create_soup(
    "https://www.ccc.govt.nz/transport/cycling/find-a-ride/trackstatus/", 
    "dynamic")

#scrape trails and status and add to dictionary

trail_list = ccc.soup.find("iframe")
print(trail_list)
'''
for _ in range(total_trails):
    current_trail = current_trail.find_next("td", class_ = trail_id)
    trails[current_trail.a.next_element] = "idk"
print(trails)
'''