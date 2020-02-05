from flask import render_template, Blueprint


main_blueprint = Blueprint('main', __name__)


@main_blueprint.route('/', defaults={'path': ''})
@main_blueprint.route('/<path:path>')
def index(path):
    return render_template("index.html")
