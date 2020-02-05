class Base(object):
     DEBUG = True
     TESTING = False

class Production(Base):
     DEBUG = False

class Development(Base):
     DEBUG = True
     TESTING = True
