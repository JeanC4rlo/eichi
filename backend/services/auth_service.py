from models import User
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import or_

def register_user_service(username, email, password):
    if User.query.filter_by(username=username).first():
        raise ValueError("O username " + username + " já está em uso")
    if User.query.filter_by(email=email).first():
        raise ValueError("O email " + email + "já está em uso")
    
    user = User(
        username=username,
        email=email,
        password=generate_password_hash(password)
    )

    db.session.add(user)
    db.session.commit()

    return user

def login_user_service(identifier, password):
    user = User.query.filter(
        or_(
            User.username == identifier,
            User.email == identifier
        )
    ).first()

    if not user:
        raise ValueError("Usuário não encontrado")
    
    if not check_password_hash(user.password, password):
        raise ValueError("A senha é inválida")
    
    return user
