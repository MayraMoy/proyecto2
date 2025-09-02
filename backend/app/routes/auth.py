from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if User.query.filter_by(email=data["email"]).first():
        return jsonify(msg="Email ya registrado"), 400

    user = User(email=data["email"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()

    return jsonify(id=user.id, email=user.email), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if not user or not user.check_password(data["password"]):
        return jsonify(msg="Credenciales inválidas"), 401

    token = create_access_token(identity=user.email)
    return jsonify(access_token=token), 200

@auth_bp.route("/users", methods=["GET"])
def list_users():
    users = User.query.all()
