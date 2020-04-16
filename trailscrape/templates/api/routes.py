from .modules.scrapers import cap, cgb, crc, vic
import os

def route():
    return {
        "cap" : cap,
        "cgb" : cgb,
        "crc" : crc,
        "vic" : vic
    }