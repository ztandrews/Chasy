from bson import ObjectId
#How we present the data

def user_serializer(user) -> dict:
    return{
        "id":str(user["_id"]),
        "first_name":user["first_name"],
        "last_name":user["last_name"],
        "email":user["email"],
        "password":user["password"],
        "free_time":user["free_time"],
        "username":user["username"]
    }

def users_serializer(users) -> list:
    return [user_serializer(user) for user in users]

def task_serializer(task) -> dict:
    return{
        "id":str(task["_id"]),
        "user":str(task["user"]),
        "time_needed":task["time_needed"],
        "title":task["title"],
        "class_for":task["class_for"],
        "completed":task["completed"],
        "priority":task["priority"],
        "target_date":task["target_date"],
        "notes":task["notes"],
    }

def tasks_serializer(tasks) -> list:
    return [task_serializer(task) for task in tasks]