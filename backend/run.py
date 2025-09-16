from app import create_app

# Crear la aplicación usando la factory function
app = create_app()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
