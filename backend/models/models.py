from datetime import datetime
from re import S
from pydantic import BaseModel, Field
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)
    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class User(BaseModel):
    _id: ObjectId
    first_name: str
    last_name: str
    email: str
    password: str
    free_time: float
    username: str

class Task(BaseModel):
    _id: ObjectId
    user: PyObjectId = Field(default_factory=PyObjectId, alias="user")
    time_needed: float
    class_for: str
    completed: bool
    priority: int
    target_date: str
    notes: str
    title: str