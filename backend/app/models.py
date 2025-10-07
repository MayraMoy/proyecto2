from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# ------------------- MODELO USER -------------------
class User(db.Model):
    __tablename__ = "users"

    # Atributos (encapsulados con guion bajo para uso interno)
    id = db.Column(db.Integer, primary_key=True)
    _email = db.Column("email", db.String(120), unique=True, nullable=False)
    _password_hash = db.Column("password_hash", db.String(128), nullable=False)

    # Constructor
    def __init__(self, email, password):
        self._email = email
        self.set_password(password)

    # Propiedades (encapsulamiento)
    @property
    def email(self):
        return self._email

    @property
    def password_hash(self):
        return self._password_hash

    # Métodos de lógica de negocio
    def set_password(self, password: str):
        """Encripta y guarda la contraseña del usuario."""
        self._password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        """Verifica si la contraseña ingresada coincide con la guardada."""
        return check_password_hash(self._password_hash, password)

    def to_dict(self):
        """Representación serializable para enviar en JSON."""
        return {"id": self.id, "email": self._email}

    def __repr__(self):
        return f"<User {self._email}>"

# ------------------- MODELO PRODUCT -------------------
class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    _name = db.Column("name", db.String(100), nullable=False)
    _description = db.Column("description", db.Text, nullable=True)
    _price = db.Column("price", db.Float, nullable=False)
    _category = db.Column("category", db.String(50), nullable=True)
    _stock = db.Column("stock", db.Integer, default=0)
    _created_at = db.Column("created_at", db.DateTime, default=datetime.utcnow)

    def __init__(self, name, price, description=None, category=None, stock=0):
        self._name = name
        self._price = price
        self._description = description
        self._category = category
        self._stock = stock

    # Propiedades para encapsulamiento
    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        self._name = value.strip()

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("El precio no puede ser negativo")
        self._price = value

    # Métodos de lógica de negocio
    def increase_stock(self, amount: int):
        if amount > 0:
            self._stock += amount

    def decrease_stock(self, amount: int):
        if 0 < amount <= self._stock:
            self._stock -= amount

    def to_dict(self):
        """Representación serializable para enviar en JSON."""
        return {
            "id": self.id,
            "name": self._name,
            "description": self._description,
            "price": self._price,
            "category": self._category,
            "stock": self._stock,
            "created_at": self._created_at.isoformat() if self._created_at else None
        }

    def __repr__(self):
        return f"<Product {self._name}>"
