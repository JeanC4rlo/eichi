import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

DB_DRIVER = os.getenv("DB_DRIVER")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

class Config:
    
    SQLALCHEMY_DATABASE_URI = (
        f"{DB_DRIVER}://{DB_USER}:{DB_PASSWORD}"
        f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

    JWT_SECRET_KEY = os.getenv("JWT_SECRET")
    if not JWT_SECRET_KEY:
        raise RuntimeError("JWT_SECRET não está definido!")
    
    # Token de acesso: 30 minutos por padrão
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES") or 60*60*30))

    # Token de refrescagem: 24 horas por padrão
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(seconds=int(os.getenv("JWT_REFRESH_TOKEN_EXPIRES") or 60*60*60*24)) 

    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_SECURE = os.getenv("ENV") == "production"
    JWT_COOKIE_SAMESITE = "Lax"
    JWT_ACCESS_COOKIE_PATH = "/"
    JWT_REFRESH_COOKIE_PATH = "/auth/refresh"
