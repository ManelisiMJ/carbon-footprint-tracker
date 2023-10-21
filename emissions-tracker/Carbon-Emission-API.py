from flask import Flask, render_template, request , url_for
import pickle
from datetime import datetime
import math


app = Flask(__name__, static_folder='static')

# Load the model from the pkl file
with open('co2_predictor_model.pkl', 'rb') as file:
    modelpredictor = pickle.load(file)

with open('FutureCO2_Emission.pkl', 'rb') as file:
    modelfuturepredictor = pickle.load(file)

@app.route('/')
def index():
    return render_template('Dashboard.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return app.send_static_file(filename)


@app.route('/predict', methods=['POST'])
def predict():
    # Retrieve user inputs from the form
    fossilFuel = float(request.form['fossilFuel'])
    emmissionFromIndirectSources = math.log(float(request.form['emmissionFromIndirectSources'])+1)
    capitalGoods = math.log(float(request.form['capitalGoods'])+1)
    distanceTravelled = float(request.form['distanceTravelled'])
    powerConsumption = math.log(float(request.form['powerConsumption'])+1)

     # Invoke your prediction model with the provided inputs
    predicted_emission = modelpredictor.predict([[fossilFuel, emmissionFromIndirectSources,capitalGoods,distanceTravelled,powerConsumption]])[0]
    
   
    # Pass the predicted value back to the UI template
    return render_template('index.html', predicted_emission=predicted_emission)

@app.route('/process-form', methods=['POST'])
def process_form():
    if 'submit_button' in request.form:
      
         return render_template('result.html', data=70.8)

@app.route('/get-message-from-python')
def get_message_from_python():
    # Perform any necessary Python logic
    message = 'Hello from Python!'
    return message

@app.route('/futureprediction', methods=['GET'])
def futureprediction():
    company=1
    WeekBackCO2= 69.55
    Week2BackCO2=58.63
    Week3BackCO2=	64.85
    WeekBackPowerConsumption=1005.56
    Week2BackPowerConsumption=1500.25
    Week3BackPowerConsumption=1700.56

    future_emission = modelfuturepredictor.predict([[company,WeekBackCO2, Week2BackCO2,Week3BackCO2,WeekBackPowerConsumption,Week2BackPowerConsumption,Week3BackPowerConsumption]])[0]

    return render_template('index.html', future_emission=future_emission)

if __name__ == '__main__':
    app.run(debug=True, port=5010)


