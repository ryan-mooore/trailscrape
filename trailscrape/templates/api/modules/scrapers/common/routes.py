from .. import cap, craigieburn, skylineq, vic
import os

def route():
    return [
        cap.run,
        craigieburn.run,
        skylineq.run,
        vic.run
    ]