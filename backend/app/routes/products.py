from flask import Blueprint, jsonify, request
from app.models import Product
from app.extensions import db

# ✅ Blueprint con prefijo correcto
products_bp = Blueprint("products", __name__, url_prefix="/products")

# ---------------------- GET: Todos los productos ----------------------
@products_bp.route("/", methods=["GET"])
def get_products():
    """Devuelve la lista de todos los productos"""
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products]), 200


# ---------------------- GET: Producto por ID ----------------------
@products_bp.route("/<int:product_id>", methods=["GET"])
def get_product(product_id):
    """Devuelve un producto por su ID"""
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Producto no encontrado"}), 404
    return jsonify(product.to_dict()), 200


# ---------------------- POST: Crear producto ----------------------
@products_bp.route("/", methods=["POST"])
def create_product():
    """Crea un nuevo producto"""
    data = request.get_json()

    name = data.get("name")
    price = data.get("price")
    description = data.get("description")
    category = data.get("category")
    stock = data.get("stock", 0)

    # Validaciones básicas
    if not name or price is None:
        return jsonify({"error": "Nombre y precio son obligatorios"}), 400

    try:
        new_product = Product(
            name=name.strip(),
            price=float(price),
            description=description.strip() if description else None,
            category=category.strip() if category else None,
            stock=int(stock)
        )
        db.session.add(new_product)
        db.session.commit()

        return jsonify(new_product.to_dict()), 201

    except ValueError:
        return jsonify({"error": "Formato de datos inválido"}), 400
    except Exception as e:
        print(f"❌ Error al crear producto: {e}")
        return jsonify({"error": "Error interno del servidor"}), 500


# ---------------------- PUT: Actualizar producto ----------------------
@products_bp.route("/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    """Actualiza un producto existente"""
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Producto no encontrado"}), 404

    data = request.get_json()

    try:
        if "name" in data:
            product._name = data["name"].strip()
        if "price" in data:
            product._price = float(data["price"])
        if "description" in data:
            product._description = data["description"].strip() if data["description"] else None
        if "category" in data:
            product._category = data["category"].strip() if data["category"] else None
        if "stock" in data:
            product._stock = int(data["stock"])

        db.session.commit()
        return jsonify(product.to_dict()), 200

    except ValueError:
        return jsonify({"error": "Formato de datos inválido"}), 400
    except Exception as e:
        print(f"❌ Error al actualizar producto: {e}")
        return jsonify({"error": "Error interno del servidor"}), 500


# ---------------------- DELETE: Eliminar producto ----------------------
@products_bp.route("/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    """Elimina un producto existente"""
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Producto no encontrado"}), 404

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Producto eliminado correctamente"}), 200


# ---------------------- OPTIONS: Preflight CORS ----------------------
@products_bp.route("/", methods=["OPTIONS"])
@products_bp.route("/<int:product_id>", methods=["OPTIONS"])
def handle_preflight(product_id=None):
    """Responde a solicitudes preflight (CORS)"""
    response = jsonify({"message": "Preflight OK"})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    return response, 200


