from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import Proveedor
from flask_jwt_extended import jwt_required

proveedores_bp = Blueprint("proveedores", __name__)

@proveedores_bp.route("/proveedores", methods=["GET"])
@jwt_required()
def get_proveedores():
    try:
        proveedores = Proveedor.query.all()
        return jsonify([proveedor.to_dict() for proveedor in proveedores]), 200
    except Exception as e:
        return jsonify({"msg": "Error al obtener proveedores"}), 500

@proveedores_bp.route("/proveedores/<int:proveedor_id>", methods=["GET"])
@jwt_required()
def get_proveedor(proveedor_id):
    try:
        proveedor = Proveedor.query.get(proveedor_id)
        if not proveedor:
            return jsonify({"msg": "Proveedor no encontrado"}), 404
        return jsonify(proveedor.to_dict()), 200
    except Exception as e:
        return jsonify({"msg": "Error al obtener proveedor"}), 500

@proveedores_bp.route("/proveedores", methods=["POST"])
@jwt_required()
def create_proveedor():
    try:
        data = request.get_json()
        
        # Validar campos requeridos
        if not data or not data.get("nombre") or not data.get("email"):
            return jsonify({"msg": "Nombre y email son requeridos"}), 400
        
        # Verificar si el email ya existe
        if Proveedor.query.filter_by(email=data["email"]).first():
            return jsonify({"msg": "Email ya registrado para otro proveedor"}), 400
        
        # Crear nuevo proveedor
        proveedor = Proveedor(
            nombre=data["nombre"],
            direccion=data.get("direccion"),
            telefono=data.get("telefono"),
            email=data["email"]
        )
        
        db.session.add(proveedor)
        db.session.commit()
        
        return jsonify(proveedor.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al crear proveedor"}), 500

@proveedores_bp.route("/proveedores/<int:proveedor_id>", methods=["PUT"])
@jwt_required()
def update_proveedor(proveedor_id):
    try:
        proveedor = Proveedor.query.get(proveedor_id)
        if not proveedor:
            return jsonify({"msg": "Proveedor no encontrado"}), 404
        
        data = request.get_json()
        
        # Verificar si el nuevo email ya existe (excluyendo el proveedor actual)
        if data.get("email") and data["email"] != proveedor.email:
            if Proveedor.query.filter_by(email=data["email"]).first():
                return jsonify({"msg": "Email ya registrado para otro proveedor"}), 400
        
        # Actualizar campos
        proveedor.nombre = data.get("nombre", proveedor.nombre)
        proveedor.direccion = data.get("direccion", proveedor.direccion)
        proveedor.telefono = data.get("telefono", proveedor.telefono)
        proveedor.email = data.get("email", proveedor.email)
        
        db.session.commit()
        return jsonify(proveedor.to_dict()), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al actualizar proveedor"}), 500

@proveedores_bp.route("/proveedores/<int:proveedor_id>", methods=["DELETE"])
@jwt_required()
def delete_proveedor(proveedor_id):
    try:
        proveedor = Proveedor.query.get(proveedor_id)
        if not proveedor:
            return jsonify({"msg": "Proveedor no encontrado"}), 404
        
        db.session.delete(proveedor)
        db.session.commit()
        
        return "", 204
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al eliminar proveedor"}), 500