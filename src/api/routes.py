"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, CharactersFavourites, PlanetsFavourites
import requests



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
    if request.method == "GET":
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]
        response_body["message"] = "Users data retrieved successfully"
        response_body["results"] = results
        return response_body, 200


@api.route("/users/<int:user_id>/characters-favourites", methods=["GET", "POST"])
def user_characters_favourites(user_id):
    response_body = {}
    rows = db.session.execute(
        db.select(CharactersFavourites).where(CharactersFavourites.user_id == user_id)
        ).scalars()
    if request.method == "GET":
        results = [row.serialize() for row in rows]
        response_body["message"] = f"User {user_id} favourite characters data retrieved successfully"
        response_body["results"] = results
        return response_body, 200
    if request.method == "POST":
        data = request.json
        character_id = data.get("character_id")
        existing_favourite = db.session.execute(
            db.select(CharactersFavourites).where(CharactersFavourites.user_id == user_id, CharactersFavourites.character_id == character_id)
            ).scalar_one_or_none()
        if existing_favourite:
            response_body["message"] = "This character is already in favourites"
            return response_body, 400
        row = CharactersFavourites(user_id=user_id, character_id=character_id)
        db.session.add(row)
        db.session.commit()
        response_body["message"] = "Favourite character added"
        response_body["results"] = row.serialize()
        return response_body, 200
    

@api.route("/users/<int:user_id>/characters-favourites/<int:character_id>", methods=["DELETE"])
def delete_user_characters_favourites(user_id, character_id):
    response_body = {}
    row = db.session.execute(
        db.select(CharactersFavourites).where(CharactersFavourites.user_id == user_id, CharactersFavourites.character_id == character_id)
        ).scalar()
    if row:
        db.session.delete(row)
        db.session.commit()
        response_body["message"] = "Favourite character deleted"
        response_body["results"] = {}
        return response_body, 200
    else:
        response_body["message"] = "Favourite character not found"
        return response_body, 404
    

@api.route("/users/<int:user_id>/planets-favourites", methods=["GET", "POST"])
def user_planets_favourites(user_id):
    response_body = {}
    rows = db.session.execute(
        db.select(PlanetsFavourites).where(PlanetsFavourites.user_id == user_id)
        ).scalars()
    if request.method == "GET":
        results = [row.serialize() for row in rows]
        response_body["message"] = "User favourite planets data retrieved successfully"
        response_body["results"] = results
        return response_body, 200
    if request.method == "POST":
        data = request.json
        planet_id = data.get("planet_id")
        existing_favourite = db.session.execute(
            db.select(PlanetsFavourites).where(PlanetsFavourites.user_id == user_id, PlanetsFavourites.planet_id == planet_id)
            ).scalar_one_or_none()
        if existing_favourite:
            response_body["message"] = "This planet is already in favourites"
            return response_body, 400
        row = PlanetsFavourites(user_id=user_id, planet_id=planet_id)
        db.session.add(row)
        db.session.commit()
        response_body["message"] = "Favourite planet added"
        response_body["results"] = row.serialize()
        return response_body, 200


@api.route("/users/<int:user_id>/planets-favourites/<int:planet_id>", methods=["DELETE"])
def delete_user_planets_favourites(user_id, planet_id):
    response_body = {}
    row = db.session.execute(
        db.select(PlanetsFavourites).where(PlanetsFavourites.user_id == user_id, PlanetsFavourites.planet_id == planet_id)
        ).scalar()
    if row:
        db.session.delete(row)
        db.session.commit()
        response_body["message"] = "Favourite planet deleted"
        response_body["results"] = {}
        return response_body, 200
    else:
        response_body["message"] = "Favourite planet not found"
        return response_body, 404


@api.route("/characters", methods=["GET"])
def characters():
    response_body ={}
    url = "https://swapi.tech/api/people"
    response = requests.get(url)
    if request.method == "GET":
        data = response.json()
        response_body["message"] ="Character data succesfully retrieved"
        response_body["results"] = data["results"]
        return response_body, 200


@api.route("/characters/<int:id>", methods=["GET"])
def character(id):
    response_body = {}
    url = f"https://swapi.tech/api/people/{id}"
    response = requests.get(url)
    if request.method == "GET":
        data = response.json()
        response_body["message"] ="Character data succesfully retrieved"
        response_body["results"] = data
        return response_body, 200


@api.route("/planets", methods=["GET"])
def planets():
    response_body ={}
    url = "https://swapi.tech/api/planets"
    response = requests.get(url)
    if request.method == "GET":
        data = response.json()
        response_body["message"] ="Planet data succesfully retrieved"
        response_body["results"] = data["results"]
        return response_body, 200


@api.route("/planets/<int:id>",methods=["GET"])
def planet(id):
    response_body = {}
    url = f"https://swapi.tech/api/planets/{id}"
    response = requests.get(url)
    if request.method == "GET":
        data = response.json()
        response_body["message"] ="Planet data succesfully retrieved"
        response_body["results"] = data
        return response_body, 200
    