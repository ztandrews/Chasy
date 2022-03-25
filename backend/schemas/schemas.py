from bson import ObjectId
#How we present the data

def user_serializer(user) -> dict:
    return{
        "id":str(user["_id"]),
        "first_name":user["first_name"],
        "last_name":user["last_name"],
        "email":user["email"],
        "password":user["password"],
        "free_time":user["free_time"]
    }

def users_serializer(users) -> list:
    return [user_serializer(user) for user in users]