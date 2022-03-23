from fastapi import FastAPI
from routes.routes import api_router
from fastapi.middleware.cors import CORSMiddleware


#Initializes a FastAPI app
app = FastAPI()

origins = [
    "http://localhost",
    "https://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Get the routes from routers.py
app.include_router(api_router)