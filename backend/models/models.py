from datetime import datetime
from pydantic import BaseModel
from bson import ObjectId

class User(BaseModel):
    _id: ObjectId
    first_name: str
    last_name: str