from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle


app = Flask(__name__)
CORS(app)

with open('./models/FutureCO2_Emission.pkl', 'rb') as file:
    modelfuturepredictor = pickle.load(file)


@app.route('/api/predict', methods=['POST'])
def api_predict():
    # Get the input data from the request
    data = request.json

    # Process the input data and generate the output
    # Replace this with your own processing logic
    output = process_data(data)

    # Create the response
    response = {'output': output}

    # Return the response as JSON
    return jsonify(response)

def process_data(data):
    # Replace this with your own data processing logic
    # Input: data (dict or list)
    # Output: processed output
    # Example:
    company=data['company']
    print(company)
    WeekBackCO2= data['weekBackCO2']
    Week2BackCO2=data['week2BackCO2']
    Week3BackCO2=	data['week3BackCO2']
    WeekBackPowerConsumption=data['weekBackPowerConsumption']
    Week2BackPowerConsumption=data['week2BackPowerConsumption']
    Week3BackPowerConsumption=data['week3BackPowerConsumption']
    future_emission = modelfuturepredictor.predict([[company,WeekBackCO2, Week2BackCO2,Week3BackCO2,WeekBackPowerConsumption,Week2BackPowerConsumption,Week3BackPowerConsumption]])[0]
    return future_emission

if __name__ == '__main__':
    app.run(debug=True,port=8000)
