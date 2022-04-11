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
    tasks = tasks_serializer(tasks_collection.find({"user":id_object, "day":day}))
    return {"status":"ok", "data":tasks}

#Post a new task
@api_router.post("/tasks")
async def post_task(task: Task):
    task_time = task.time_needed
    day = task.day
    uid = task.user
    id_object = ObjectId(uid)
    user = users_serializer(users_collection.find({"_id":id_object}))
    free_time = (user[0]["free_time"])
    if (task_time > free_time):
        return{"status":"bad","data":"Failure. Not enough free time for this task."}
    else:
        time_used = 0
        users_tasks = tasks_serializer(tasks_collection.find({"user":id_object, "day":day, "completed":False}))
        for users_task in users_tasks:
            tasks_time = (users_task["time_needed"])
            time_used = time_used+tasks_time
        time_used_plus_new_task = time_used+task_time
        if (time_used_plus_new_task>free_time):
            return{"status":"bad","data":"Failure. Not enough free time for this task"}
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