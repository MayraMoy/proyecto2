from app import create_app
from app.extensions import db

# 🔹 Importa aquí tus modelos
from app.models import Proveedor, Producto   # ajusta la ruta según tu proyecto

app = create_app()

with app.app_context():
    db.create_all()
    print("✔️ Tablas creadas correctamente.")
