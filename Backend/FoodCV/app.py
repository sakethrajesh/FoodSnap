from flask import Flask, request, jsonify
from flask_sock import Sock
import os, json, subprocess, shutil
from ultralytics import YOLO
import numpy as np
from collections import defaultdict

app = Flask(__name__)
model = YOLO('yolov8n.pt')  # pretrained YOLOv8n model


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
    
    return jsonify({"ingredients": ingredients})

# make an endpoint for the frontend to send the image to backend
@app.route('/api/upload', methods=['POST'])
def upload():
    # get the image from the frontend
    image = request.files['image']
    # save the image to the backend
    image.save(os.path.join(app.config["IMAGE_UPLOADS"], image.filename))
    # return the image to the frontend
    return jsonify({"image": image.filename})






