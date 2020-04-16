class Base(object):
     DEBUG = True
     TESTING = False

class Production(Base):
     DEBUG = False
     ENV = "production"

class Development(Base):
     DEBUG = True
     TESTING = True
     ENV = "development"
