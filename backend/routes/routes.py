from csv import unregister_dialect
from fastapi import APIRouter
from config.database import chasy_collection, users_collection, tasks_collection
from models.models import User, Task
from schemas.schemas import user_serializer, users_serializer, task_serializer, tasks_serializer
from bson import ObjectId
import pymongo

api_router = APIRouter()

#Greeting message
@api_router.get("/")
async def welcome():
    return {"message":"Welcome to the Chasy API"}

#Get users
@api_router.get("/users")
async def get_users():
    users = users_serializer(users_collection.find())
    return {"status":"ok", "data":users}

#Get tasks
@api_router.get("/tasks")
async def get_tasks():
    tasks = tasks_serializer(tasks_collection.find())
    return {"status":"ok", "data":tasks}

#Get tasks by user
@api_router.get("/tasks/{user_id}")
async def get_tasks_by_id(user_id):
    id = user_id
    id_object = ObjectId(id)
    tasks = tasks_serializer(tasks_collection.find({"user":id_object}))
    return {"status":"ok", "data":tasks}

#Get tasks by user and day
@api_router.get("/tasks/{user_id}/{day}")
async def get_tasks_by_id_day(user_id, day):
    id = user_id
    id_object = ObjectId(id)
    tasks = tasks_serializer(tasks_collection.find({"user":id_object, "day":day, "completed":False}))
    return {"status":"ok", "data":tasks}

#Post a new task
@api_router.post("/tasks")
async def post_task(task: Task):
    task_time = task.time_needed
    target = task.target_date
    uid = task.user
    id_object = ObjectId(uid)
    user = users_serializer(users_collection.find({"_id":id_object}))
    users_tasks = tasks_serializer(tasks_collection.find({"user":id_object, "completed":False}))
    free_time = (user[0]["free_time"])
    if (task_time > free_time):
        return{"status":"bad","data":"Failure. Not enough free time for this task."}
    else:
        _id = tasks_collection.insert_one(dict(task))
        return {"status":"ok", "data":"success"}

#Register
@api_router.post("/register")
async def register_user(user: User):
    _id = users_collection.insert_one(dict(user))
    return {"status":"ok"}

#Login
@api_router.post("/login")
async def login_user(username, password):
    user = users_serializer(users_collection.find({"username":username, "password":password}))
    resp = len(user)
    if (resp == 0):
        return {"status":"invalid username or password","data":user}
    else:
        return {"status":"ok","data":user}

#Update task status
@api_router.put("/tasks/{task_id}/{status}")
async def update_status(task_id, status):
    id = task_id
    id_objeect = ObjectId(id)
    if (status=="false"):
        var1 = False
    else:
        var1 = True
    tasks_collection.update_one({"_id":id_objeect},{"$set":{"completed":var1}})
    return {"status":"ok","data":"ok"}

#Delete task
@api_router.delete("/tasks/{task_id}")
async def delete_task(task_id):
    id = task_id
    id_object = ObjectId(id)
    tasks_collection.delete_one({"_id":id_object})
    return {"status":"ok","data":"ok"}

#Plan day
@api_router.get("/plan/{user_id}/{day}")
async def plan_day(user_id, day):
    id = user_id
    id_object = ObjectId(id)
    #Calculate importance of each task
    #See how many of the most important tasks we can fit into the day
    def calculate_importance(task, today):
        task_id = ObjectId(task["id"])
        days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
        today_index = days.index(today)+1
        target_index = days.index(task["target_date"])+1
        days_away = target_index-today_index
        if (days_away <0):
            days_away = 7+days_away
        else:
            days_away=days_away
        days_away = int(days_away)
        tasks_collection.update_one({"_id":task_id},{"$set":{"priority":days_away}})
    tasks = tasks_serializer(tasks_collection.find({"user":id_object,"completed":False}))
    for task in tasks:
        calculate_importance(task,day)
    tasks = tasks_serializer(tasks_collection.find({"user":id_object,"completed":False}))
    tasks.sort(key = lambda x:x['priority'])
    user = users_serializer(users_collection.find({"_id":id_object}))
    free_time = (user[0]["free_time"])
    print("Free time")
    print(free_time)
    todays_tasks = []
    for task in tasks:
        difference = free_time - task["time_needed"]
        if difference >= 0:
            todays_tasks.append(task)
            print(task["time_needed"])
            print('added')
            free_time = free_time - task["time_needed"]
        else:
            print("Not enough space")
        print("New free time")
        print(free_time)
        print()
    for task in todays_tasks:
        print(task["title"])
    return {"status":"ok","data":todays_tasks}

#Move target day
@api_router.put("/tasks/move/{task_id}/{new_day}")
async def move_target_day(task_id, new_day):
    tid = task_id
    tid_object = ObjectId(tid)
    tasks_collection.update_one({"_id":tid_object}, {"$set": {"target_date":new_day}})
    return{"status":"ok","data":"success"}

#Delete task
@api_router.delete("/tasks/user/{user_id}")
async def clear_task(user_id):
    id = user_id
    id_object = ObjectId(id)
    tasks_collection.delete_many({"user":id_object})
    return {"status":"ok","data":"ok"}

#Delete task
@api_router.delete("/tasks/user/{user_id}/completed")
async def clear_task(user_id):
    id = user_id
    id_object = ObjectId(id)
    tasks_collection.delete_many({"user":id_object, "completed":True})
    return {"status":"ok","data":"ok"}

#Get user by ID
@api_router.get("/users/{user_id}")
async def get_user_by_id(user_id):
    id = user_id
    id_object = ObjectId(id)
    user = users_serializer(users_collection.find({"_id":id_object}))
    return {"status":"ok", "data":user}

#Update free time
@api_router.put("/users/{user_id}/{free_time}")
async def update_free_time(user_id, free_time):
    id = user_id
    id_object = ObjectId(id)
    free_time = int(free_time)
    users_collection.update_one({"_id":id_object},{"$set":{"free_time":free_time}})
    return {"status":"ok","data":"success"}