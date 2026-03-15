from models.user import User

def get_user_by_id(id):
    user = User.query.get(int(id))

    if not user:
        raise ValueError(f"O usuário com o id {id} não existe")
    
    return user
