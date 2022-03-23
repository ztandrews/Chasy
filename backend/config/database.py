import collections
from pymongo import MongoClient
import certifi
ca = certifi.where()

#Database URL
url ="mongodb+srv://admin:admin@cluster0.xp6pq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

#Connect to our database
client = MongoClient(url, tlsCAFile=ca)
db = client.Chasy


#Declare databases
chasy_collection = db["Chasy"]