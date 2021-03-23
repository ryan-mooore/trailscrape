import re

def get_park_status(soup):

    span = soup.find("span",
        text=re.compile(r"Victoria Park Downhill"))

    status = span.parent.parent.parent.parent.parent['class'][0]
    status = status.upper()
    
    if status.endswith("OPEN"):
        return True
    if status.endswith("CLOSED"):
        return False