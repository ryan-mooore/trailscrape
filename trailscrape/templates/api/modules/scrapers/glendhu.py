from .common import trailforks, classes
import re

def run():
    glendhu = classes.Region()
    glendhu.name = "Bike Glendhu"

    glendhu.create_soup(
        "https://bikeglendhu.co.nz/trails/", 
        "dynamic")

    status = glendhu.soup.find("div",
        {"class" : "park_status__status"}).string.upper()

    if status == "OPEN":
        glendhu.park_is_open = True
    if status == "CLOSED":
        glendhu.park_is_open = False

    trail_list = glendhu.soup.find("div",
        {"class" : "trails__content"}).find_all("div", {"class" : "trail "})
    print(trail_list)

    for div in trail_list:
        print(div.find("div", {"class" : "trail__details"}))
        """
        details = div.find("div", {"class" : "trail__details"})
            
        name = details.find("h2", {"class" : "trail__name"})
        
        status = details.find("div", {"class" : "trail__info"})\
            .find("div").find("span").string.upper()

        grade = details.find("div", {"class" : "trail__info"})\
            .find("div", {"class" : "trail__level"}).find("span").string.upper()

        parsed_status = None

        if status == "OPEN":
            parsed_status = True

        if status == "CLOSED":
            parsed_status = False

        glendhu.trails.append(
            classes.Trail(
                name,
                grade,
                parsed_status
            )
        )
        """
    
    return glendhu.json_encode()

