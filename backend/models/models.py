from datetime import datetime
from re import S
from pydantic import BaseModel
from bson import ObjectId

class User(BaseModel):
    _id: ObjectId
    first_name: str
    last_name: str
    email: str
    password: str
    free_time: float