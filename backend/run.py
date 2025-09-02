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

# ----------------- MODELO -----------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    username = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(200))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "email": self.email
        }

# Crear las tablas si no existen
with app.app_context():
    db.create_all()

# ----------------- RUTAS -----------------
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
    new_user = User(
        name=data.get("name"),
        username=data.get("username"),
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
    user.name = data.get("name", user.name)
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
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

# ----------------- MAIN -----------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
