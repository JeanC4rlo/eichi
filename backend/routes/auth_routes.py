from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from services import register_user_service, login_user_service

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.post("/register")
def register_user_service_route():
    try:
        data = request.get_json()

        if not data:
            raise ValueError("JSON com os dados está indisponível")
        
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not all([username, email, password]):
            raise ValueError("Há campos faltantes")
        
        user = register_user_service(username, email, password)

        return jsonify(
            {
                "message": "Usuário criado com sucesso",
                "id": user.id
            }
        ), 201

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    
    except Exception as e:
        return jsonify({"error": "Erro interno: " + str(e)}), 500
    
@auth_bp.post("/login")
def login_user_service_route():
    try:
        data = request.get_json()

        if not data:
            raise ValueError("JSON com os dados está indisponível")
        
        identifier = data.get("identifier")
        password = data.get("password")

        if not all([identifier, password]):
            raise ValueError("Há campos faltantes")
        
        user = login_user_service(identifier, password)
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))

        return jsonify({
            "message": "Usuário autenticado com sucesso",
            "access_token": access_token,
            "refresh_token": refresh_token
        }), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    
    except Exception as e:
        return jsonify({"error": "Erro interno"}), 500

@auth_bp.post("/refresh")
@jwt_required(refresh=True)
def refresh_user_route():
    user_id = get_jwt_identity()
    new_access = create_access_token(identity=user_id)
    return jsonify({
        "message": "Usuário refrescado com sucesso",
        "access_token": new_access
    }), 200
