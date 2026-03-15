from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from services.user_service import get_user_by_id

user_bp = Blueprint("user", __name__, url_prefix="/user")

@user_bp.get("/me")
@jwt_required()
def me_user_route():
    try:
        user_id = get_jwt_identity()

        if not user_id:
            raise ValueError("O id do usuário está vazio")

        user = get_user_by_id(user_id)

        return jsonify({
            "message": "Usuário ativo retornado com sucesso",
            "id": user.id,
            "username": user.username,
            "email": user.email
        }), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    
    except Exception as e:
        return jsonify({"error": "Erro interno"}), 500
