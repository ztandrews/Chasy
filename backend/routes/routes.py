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
    _id = tasks_collection.insert_one(dict(task))
    return {"status":"ok", "data":"success"}
