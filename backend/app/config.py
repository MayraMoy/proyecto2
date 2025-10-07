import os

# Carpeta raíz del proyecto (no solo /app)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# Ruta completa a la base de datos
DB_PATH = os.path.join(BASE_DIR, "db_data", "app.db")

class Config:
    # URI de conexión con la base de datos SQLite
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_PATH}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = os.getenv("SECRET_KEY", "dev_secret_key")