
from google.colab import drive
drive.mount('/content/drive')
from flask_ngrok import run_with_ngrok
from flask import Flask, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

run_with_ngrok(app)

@app.route("/",methods=['POST'])
def post_task():   
  modelfile = 'C:\Users\sayli\AppData\Local\Programs\Python\backend.pkl'
  model = pickle.load(open(modelfile, 'rb'))
  print(model)

  data = request.get_json()
  temp = data.get("Temperature")
  press = data.get("Pressure")
  hum = data.get("Humidity")

  print("Temp: " + temp)
  print("Pressure: " + press)
  print("Humidity: " + hum)

  data = np.array([int(temp), int(press), int(hum)])
  print(data)

  output = model.predict_proba([data])
  output = output[0]
  print(output[1])

  return jsonify({'Intensity': output[1]})
  
app.run()