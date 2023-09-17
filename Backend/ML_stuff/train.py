import os
from roboflow import Roboflow

HOME = os.getcwd()

rf = Roboflow(api_key="oGEPyZ9XV0QrGyBrCADb")
project = rf.workspace("shreyas-jammi").project("shopping-items")
dataset = project.version(1).download("yolov8")

yolo task=detect device=mps mode=train model=yolov8s.pt data={dataset.location}/data.yaml epochs=200 imgsz=800 plots=True