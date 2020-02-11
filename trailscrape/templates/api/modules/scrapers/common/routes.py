from .. import cap, craigieburn, skylineq, vic, halswell, glendhu
import os

def route():
    return [
        cap.run,
        craigieburn.run,
        skylineq.run,
        vic.run,
        halswell.run,
        glendhu.run
    ]