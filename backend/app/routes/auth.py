from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        
        # Validar que se proporcionen los campos requeridos
        if not data or not data.get("email") or not data.get("password"):
            return jsonify({"msg": "Email y contraseña son requeridos"}), 400
        
        # Verificar si el usuario ya existe
        if User.query.filter_by(email=data["email"]).first():
            return jsonify({"msg": "Email ya registrado"}), 400

        # Crear nuevo usuario
        user = User(email=data["email"])
        user.set_password(data["password"])
        db.session.add(user)
        db.session.commit()

        return jsonify({"id": user.id, "email": user.email}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error interno del servidor"}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        
        # Validar que se proporcionen los campos requeridos
        if not data or not data.get("email") or not data.get("password"):
            return jsonify({"msg": "Email y contraseña son requeridos"}), 400
        
        # Buscar usuario y verificar contraseña
        user = User.query.filter_by(email=data["email"]).first()
        if not user or not user.check_password(data["password"]):
            return jsonify({"msg": "Credenciales inválidas"}), 401

        # Crear token JWT
        token = create_access_token(identity=user.email)
        return jsonify({
            "access_token": token,
            "user": user.to_dict()
        }), 200
    
    except Exception as e:
        return jsonify({"msg": "Error interno del servidor"}), 500

@auth_bp.route("/users", methods=["GET"])
@jwt_required()
def list_users():
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200
    except Exception as e:
        return jsonify({"msg": "Error al obtener usuarios"}), 500

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404
        return jsonify(user.to_dict()), 200
    except Exception as e:
        return jsonify({"msg": "Error al obtener perfil"}), 500