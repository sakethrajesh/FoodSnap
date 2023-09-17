from flask import Flask, request, jsonify
from flask_sock import Sock
import os, json, subprocess, shutil
from ultralytics import YOLO
import numpy as np
from collections import defaultdict
import pymongo
from bson import json_util
from langchain.llms import OpenAI
from langchain import PromptTemplate, LLMChain
import concurrent.futures

app = Flask(__name__)
connection_string = "mongodb+srv://poweruser:1PDanWORHzg7sVfj@vthacks2023.ymk3xof.mongodb.net/?retryWrites=true&w=majority"
model = YOLO('yolov8n.pt')  # pretrained YOLOv8n model

client = pymongo.MongoClient(connection_string)

# Connect to your database (create it if it doesn't exist)
db = client["VTHacks2023"]

users_collection = db["users"]

@app.route('/add_user', methods=['POST'])
def add_user():
   # Extract user data from the request
   user_data = request.get_json()

   # Insert the user document into the collection
   users_collection.insert_one(user_data)

   return "User added successfully", 201

@app.route('/get_user/<username>', methods=['GET'])
def get_user(username):
   # Query the collection to retrieve the user by username
   user = users_collection.find_one({"username": username})

   if user:
       return parse_json(user)
   else:
       return "User not found", 404
def parse_json(data):
    return json.loads(json_util.dumps(data))

@app.route('/add_recipe/<username>', methods=['POST'])
def add_recipe(username):
    try:
        # Retrieve the user by username
        user = users_collection.find_one({"username": username})

        if not user:
            return "User not found", 404

        # Get the recipe data from the request
        recipe_data = request.get_json()

        # Add the recipe to the user's recipes list
        user['recipes'].append(recipe_data)

        # Update the user document in the collection
        users_collection.update_one({"_id": user["_id"]}, {"$set": user})

        return jsonify({"message": "Recipe added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/test_connection', methods=['GET'])
def test_connection():
   try:
       # Attempt a simple database operation (find one document)
       test_doc = users_collection.find_one()
       if test_doc:
           return "Connection to MongoDB successful", 200
       else:
           return "Connection test failed", 500
   except Exception as e:
       return f"Connection error: {str(e)}", 500

# make a hello world endpoint
@app.route('/')
def hello_world():
    return 'Hello, World!'

# make an endpoint that is called get reciepes
@app.route('/api/getReciepes', methods=['GET','POST'])
def getReciepes():
    image = request.files['image']
    # get the ingredients from the picture
    detections = getIngredients(image)

    # clean up the detections
    # call openai api on the ingredients
    

    return jsonify({"reciepes": ["reciepe1", "reciepe2"]})

# make an endpoint that is called get ingedients
@app.route('/api/getIngredients', methods=['GET','POST'])
def getIngredients():
    image = request.files['image']
    stuff = image.save(os.path.join('stuff.jpeg'))
    
    results = model('stuff.jpeg') 

    result = results[0]
    bboxes = result.boxes.xyxy.cpu().tolist()
    classes = result.boxes.cls.cpu().tolist()
    names = result.names


    ingredients = defaultdict(int)  

    for cls, bbox in zip(classes, bboxes):
        (x1, y1, x2, y2) = bbox
        color = (0, 255, 0)
        

    ingredients[names[cls]] += 1

    template = """Question: {question} 
            Answer: Let's think step by step."""

    prompt = PromptTemplate(template=template, input_variables=["question"])

    llm = OpenAI(openai_api_key='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')

    llm_chain = LLMChain(prompt=prompt, llm=llm)

    detections = ''

    question = f"generate a 3 recipes with this list of ingredients ${ingredients} and use mostly the ingredients given"

    thing = llm_chain.run(question)

    print(thing, flush=True)

        
    
    return jsonify({"recipies": thing})


@app.route('/api/generateRecipe', methods=['POST'])
def generateRecipe():
    print("in here", flush=True)
    ingredients = request.json.get('ingredients')

    template = """Question: {question} 
            Answer: Let's think step by step."""

    prompt = PromptTemplate(template=template, input_variables=["question"])

    llm = OpenAI(openai_api_key='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')

    llm_chain = LLMChain(prompt=prompt, llm=llm)

    detections = ''

    question = f"generate a recipe with this list of ingredients ${ingredients} and use mostly the ingredients given, given the output with the ingredients you list used and number the steps"

    # thing = llm_chain.run(question)

    def run_llm_chain(question):
        return llm_chain.run(question)
    
    thing = []
    thing.append(run_llm_chain(question))
    # thing.append(run_llm_chain(question))
    # thing.append(run_llm_chain(question))
    print(thing, flush=True)
        
    
    return jsonify({"recipies": thing})





# make an endpoint for the frontend to send the image to backend
@app.route('/api/upload', methods=['POST'])
def upload():
    # get the image from the frontend
    image = request.files['image']
    # save the image to the backend
    image.save(os.path.join(app.config["IMAGE_UPLOADS"], image.filename))
    # return the image to the frontend
    return jsonify({"image": image.filename})


@app.route('/add_friend/<username>', methods=['POST'])
def add_friend(username):
    try:
        # Retrieve the user by username
        user = users_collection.find_one({"username": username})

        if not user:
            return "User not found", 404

        # Get the friend's username from the request
        friend_username = request.json.get("friend_username")

        if not friend_username:
            return "Friend username not provided", 400

        # Check if the friend username exists in the database
        friend = users_collection.find_one({"username": friend_username})

        if not friend:
            return "Friend not found", 404

        # Add the friend to the user's friends list
        if friend_username not in user['friends']:
            user['friends'].append(friend_username)

            # Update the user document in the collection
            users_collection.update_one({"_id": user["_id"]}, {"$set": user})

        return jsonify({"message": "Friend added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get_users', methods=['GET'])
def get_users():
    try:
        # Retrieve the first 25 users from the collection
        users = users_collection.find({"recipes": {"$exists": True, "$ne": []}}).limit(25)

        # Convert the cursor to a list of user documents
        user_list = list(users)

        return parse_json(user_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
# api route that gets a picture based on dish that is passed in
@app.route('/api/getPicture/<dish>', methods=['GET','POST'])
def getPicture(dish):
    return jsonify({"picture": "picture"})





