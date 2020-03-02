import sys
sys.path.append('../..')

from scrapers import cap_copy
import os

def route():
    return {
        "cap" : cap_copy,
    }