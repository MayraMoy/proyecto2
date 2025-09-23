from flask import Flask
from app.config import Config
from app.extensions import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.routes.auth import auth_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensiones
    db.init_app(app)
    JWTManager(app)

    # Habilitar CORS para todas las rutas y todos los orígenes (incluye métodos POST, DELETE, etc.)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Registrar Blueprints
    app.register_blueprint(auth_bp)

    return app