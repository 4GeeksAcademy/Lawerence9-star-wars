"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route("/users", methods=["GET"])
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    results = [row.serialize() for row in rows]
    response_body["message"] = f"ok"
    response_body["results"] = results
    return response_body, 200


@api.route("/products/<int:id>",methods=["GET","PUT","DELETE"])
def product(id):
    response_body = {}
    if request.method == "GET":
        response_body["message"] = f"{request.method} of {id}"
        return response_body, 200
    if request.method == "PUT":
        response_body["message"] = f"{request.method} of {id}"
        return response_body, 200
    if request.method == "DELETE":
        response_body["message"] = f"{request.method} of {id}"
        return response_body, 200
    