# AHORA
from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = "users"

    # Atributos 
    id = db.Column(db.Integer, primary_key=True)
    _email = db.Column("email", db.String(120), unique=True, nullable=False)
    _password_hash = db.Column("password_hash", db.String(128), nullable=False)

    # Constructor
    def __init__(self, email, password):
        self._email = email
        self.set_password(password)

    # Encapsulamiento: Getter y Setter
    @property
    def email(self):
        return self._email

    @property
    def password_hash(self):
        return self._password_hash

    # Métodos 
    def set_password(self, password: str):
        """Encripta y guarda la contraseña del usuario."""
        self._password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        """Verifica si la contraseña ingresada coincide con la guardada."""
        return check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f"<User {self._email}>"

class Product(db.Model):
    __tablename__ = "products"

    # Atributos
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column("name", db.String(100), nullable=False)
    description = db.Column("description", db.Text, nullable=True)
    price = db.Column("price", db.Float, nullable=False)
    category = db.Column("category", db.String(50), nullable=True)
    stock = db.Column("stock", db.Integer, default=0)
    created_at = db.Column("created_at", db.DateTime, default=db.func.current_timestamp())

    # Constructor
    def __init__(self, name, price, description=None, category=None, stock=0):
        self._name = name
        self._price = price
        self._description = description
        self._category = category
        self._stock = stock

    # Métodos
    def increase_stock(self, amount):
        self._stock += amount

    def decrease_stock(self, amount):
        if amount <= self._stock:
            self._stock -= amount

    def to_dict(self):
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
