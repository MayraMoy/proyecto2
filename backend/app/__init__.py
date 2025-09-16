
from flask import Flask
from app.config import Config
from app.extensions import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensiones
    db.init_app(app)
    JWTManager(app)

    # Habilitar CORS para todas las rutas y todos los orígenes
    CORS(app, resources={
        r"/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })

    # Importar modelos para que SQLAlchemy los reconozca
    from app.models import User, Proveedor, Producto

    # Registrar Blueprints
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api')

    # Crear tablas si no existen
    with app.app_context():
        db.create_all()

    return app