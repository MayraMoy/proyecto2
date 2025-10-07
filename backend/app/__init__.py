from flask import Flask
from app.config import Config
from app.extensions import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.routes.auth import auth_bp
from app.routes.users import users_bp
from app.routes.products import products_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    JWTManager(app)

    # ✅ Configuración completa de CORS (para React)
    CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}},
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

    # Registrar Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(products_bp)

    return app

