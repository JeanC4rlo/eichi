from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
from services import register_user_service, login_user_service

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.post("/register")
def register_user_route():
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
def login_user_route():
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

        resp = jsonify({
            "message": "Usuário autenticado com sucesso"
        })

        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)

        return resp, 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    
    except Exception as e:
        return jsonify({"error": "Erro interno"}), 500
    
@auth_bp.post("/logout")
def logout_user_route():
    resp = jsonify({"message": "Usuário deslogado com sucesso"})
    
    unset_jwt_cookies(resp)

    return resp, 200

@auth_bp.post("/refresh")
@jwt_required(refresh=True)
def refresh_user_route():
    user_id = get_jwt_identity()
    access_token = create_access_token(identity=user_id)
    
    resp = jsonify({
        "message": "Usuário refrescado com sucesso",
    })
    set_access_cookies(resp, access_token)

    return resp, 200
