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
import requests
import re

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
    data = request.get_json()
    image_url = data.get('image_url')

    # Fetch the image from the URL
    response = requests.get(image_url)
    response.raise_for_status()  # Raise an exception if the request fails

    # Save the image temporarily
    with open('stuff.jpeg', 'wb') as f:
        f.write(response.content)

    # Perform your image processing here (assuming 'model' is defined elsewhere)
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
    
    return jsonify({"ingredients": ingredients})


@app.route('/api/generateRecipe', methods=['POST'])
def generateRecipe():
    print("in here", flush=True)
    ingredients = request.json.get('ingredients')

    items = []
    sentence = ''
    for item, count in ingredients.items():
        items.append(f"{count} {item}s")

    if len(items) == 1:
        sentence = f"I have {items[0]}."
    elif len(items) == 2:
        sentence = f"I have {items[0]} and {items[1]}."
    else:
        sentence = f"I have {', '.join(items[:-1])}, and {items[-1]}."


    template = """${sentence}, generate a recipe. 
                \n\nStructure the recipe as follows: 
                \n1. Name of Dish 
                \n2. Ingredients
                \n3. Steps
                \n\nExceptionally long answer:
                """

    prompt = PromptTemplate(template=template, input_variables=["sentence"])

    llm = OpenAI(openai_api_key='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')

    llm_chain = LLMChain(prompt=prompt, llm=llm)

    # thing = llm_chain.run(question)
    
    thing = []
    thing.append(llm_chain(sentence))
    thing.append(llm_chain(sentence))
    thing.append(llm_chain(sentence))
    print(thing, flush=True)

    my_arr = []

    try:
        # Extract the name
        name_match = re.search(r'^\d+\.\s+(.*?)\s*$', thing[0]["text"], re.MULTILINE)
        name = name_match.group(1)

        # Extract the ingredients
        ingredients_match = re.search(r'2\. Ingredients:(.*?)3\. Steps:', thing[0]["text"], re.DOTALL)
        ingredients_text = ingredients_match.group(1)
        ingredients = [ingredient.strip() for ingredient in ingredients_text.split('\n') if ingredient.strip() != ""]

        # Extract the steps
        steps_match = re.search(r'3\. Steps:(.*?)$', thing[0]["text"], re.DOTALL)
        steps_text = steps_match.group(1)
        steps = [step.strip() for step in steps_text.split('\n') if step.strip() != ""]

        
        my_dict = {}
        my_dict["name"] = name
        my_dict["ingredients"] = ingredients
        my_dict["steps"] = steps
        my_arr.append(my_dict)
    except:
        print("error")


    try:
        # Extract the name
        name_match = re.search(r'^\d+\.\s+(.*?)\s*$', thing[1]["text"], re.MULTILINE)
        name = name_match.group(1)

        # Extract the ingredients
        ingredients_match = re.search(r'2\. Ingredients:(.*?)3\. Steps:', thing[1]["text"], re.DOTALL)
        ingredients_text = ingredients_match.group(1)
        ingredients = [ingredient.strip() for ingredient in ingredients_text.split('\n') if ingredient.strip() != ""]

        # Extract the steps
        steps_match = re.search(r'3\. Steps:(.*?)$', thing[1]["text"], re.DOTALL)
        steps_text = steps_match.group(1)
        steps = [step.strip() for step in steps_text.split('\n') if step.strip() != ""]

        
        my_dict = {}
        my_dict["name"] = name
        my_dict["ingredients"] = ingredients
        my_dict["steps"] = steps
        my_arr.append(my_dict)
    except:
        print("error")
    

    #######
    #######
    try:
        # Extract the name
        name_match = re.search(r'^\d+\.\s+(.*?)\s*$', thing[2]["text"], re.MULTILINE)
        name = name_match.group(1)

        # Extract the ingredients
        ingredients_match = re.search(r'2\. Ingredients:(.*?)3\. Steps:', thing[2]["text"], re.DOTALL)
        ingredients_text = ingredients_match.group(1)
        ingredients = [ingredient.strip() for ingredient in ingredients_text.split('\n') if ingredient.strip() != ""]

        # Extract the steps
        steps_match = re.search(r'3\. Steps:(.*?)$', thing[2]["text"], re.DOTALL)
        steps_text = steps_match.group(1)
        steps = [step.strip() for step in steps_text.split('\n') if step.strip() != ""]

        
        my_dict = {}
        my_dict["name"] = name
        my_dict["ingredients"] = ingredients
        my_dict["steps"] = steps
        my_arr.append(my_dict)
    except:
        print("error")

    



   
    return jsonify({"recipies": my_arr})





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

    api_key = "uPsNRgtXahQvmogF0f5bLA7Do5h-1nOTqNqZycEN_TI"

    # Define the API endpoint
    url = f'https://api.unsplash.com/search/photos/?query={dish}&client_id={api_key}'

    # Send the GET request
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        photos = data['results'][0]

    return jsonify({"picture_url": photos['urls']['regular']})





