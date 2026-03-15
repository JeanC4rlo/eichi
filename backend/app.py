import os
from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, jwt
from routes import auth_bp, user_bp

def create_app():
    app = Flask(__name__)
    
    origins = os.getenv("FRONTEND_URLS", "").split(",")
    CORS(
        app,
        origins=origins,
        supports_credentials=True
    )

    app.config.from_object(Config)
    app.config.from_prefixed_env()

    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)

    with app.app_context():
        if not os.getenv("FLASK_ENV") == "production":
            db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    host = app.config.get("HOST", "127.0.0.1")
    port = int(app.config.get("PORT", 5000))
    app.run(host=host, port=port)
