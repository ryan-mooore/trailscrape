from flask import Flask
from templates import app


if __name__ == '__main__':
    app.config.from_object('configurations.Development')
    app.run()
