from flask import Blueprint, jsonify, request
from app.models import User
from app.extensions import db

users_bp = Blueprint("users", __name__, url_prefix="/users")

@users_bp.route("/", methods=["GET"])
def get_users():
    """Devuelve la lista de usuarios."""
    users = User.query.all()
    users_data = [{"id": u.id, "email": u.email} for u in users]
    return jsonify(users_data), 200

@users_bp.route("/", methods=["POST"])
def create_user():
    """Crea un nuevo usuario."""
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Faltan datos"}), 400

    if User.query.filter_by(_email=email).first():
        return jsonify({"error": "El usuario ya existe"}), 400

    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario creado correctamente"}), 201
