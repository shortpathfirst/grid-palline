#   https://tms-dev-blog.com/python-backend-with-javascript-frontend-how-to/
################MAKE ANOTHER FILE

from flask import Flask
import flask
import json
from flask_cors import CORS
import random
import utils

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello,world!"


@app.route('/api/randomImage', methods=["GET"])
def randomImg():
    print("users endpoint reached...")
    pathimg = random.choice(utils.getFileList())
    return utils.loadImg(pathimg)

# @app.route('/api/download', methods=["POST"])
# def users(img):
#     return utils.arrayToImg(img)

if(__name__=="__main__"):
    app.run("localhost",5000)