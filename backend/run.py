import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Ruta de la base de datos (dentro de db_data)
DB_PATH = os.path.join(os.path.dirname(__file__), "db_data", "app.db")
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# ----------------- MODELOS -----------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email
        }

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=True)
    stock = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'stock': self.stock,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

# Crear las tablas si no existen
with app.app_context():
    db.create_all()

# ----------------- RUTAS DE USUARIOS -----------------
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])

@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.to_dict())
    return jsonify({"error": "User not found"}), 404

@app.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    
    # Validaciones básicas
    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password are required"}), 400
    
    new_user = User(
        email=data.get("email"),
        password=data.get("password")  # ⚠️ en real se encripta
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    
    if data.get("email"):
        user.email = data.get("email")
    
    db.session.commit()
    return jsonify(user.to_dict())

@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return "", 204

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    new_user = User(
        email=data.get("email"),
        password=data.get("password")
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

# ----------------- RUTAS DE PRODUCTOS -----------------
@app.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products])

@app.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = Product.query.get(product_id)
    if product:
        return jsonify(product.to_dict())
    return jsonify({"error": "Product not found"}), 404

@app.route("/products", methods=["POST"])
def create_product():
    try:
        data = request.get_json()
        
        # Validaciones básicas
        if not data.get("name") or not data.get("price"):
            return jsonify({"error": "Name and price are required"}), 400
        
        if float(data.get("price", 0)) <= 0:
            return jsonify({"error": "Price must be greater than 0"}), 400
        
        new_product = Product(
            name=data.get("name").strip(),
            description=data.get("description", "").strip() if data.get("description") else None,
            price=float(data.get("price")),
            category=data.get("category", "").strip() if data.get("category") else None,
            stock=int(data.get("stock", 0))
        )
        
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.to_dict()), 201
        
    except ValueError as e:
        return jsonify({"error": "Invalid data format"}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route("/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404

        data = request.get_json()
        
        # Validaciones
        if data.get("name"):
            product.name = data.get("name").strip()
        if data.get("price") is not None:
            if float(data.get("price")) <= 0:
                return jsonify({"error": "Price must be greater than 0"}), 400
            product.price = float(data.get("price"))
        
        # Campos opcionales
        if "description" in data:
            product.description = data.get("description", "").strip() if data.get("description") else None
        if "category" in data:
            product.category = data.get("category", "").strip() if data.get("category") else None
        if "stock" in data:
            product.stock = int(data.get("stock", 0))
        
        db.session.commit()
        return jsonify(product.to_dict())
        
    except ValueError as e:
        return jsonify({"error": "Invalid data format"}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route("/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    db.session.delete(product)
    db.session.commit()
    return "", 204

# ----------------- MAIN -----------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
