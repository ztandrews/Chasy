from fastapi import APIRouter
from config.database import chasy_collection
from models.models import User
from schemas.schemas import user_serializer, users_serializer
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
    users = users_serializer(chasy_collection.find())
    return {"status":"ok", "data":users}