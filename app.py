from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

df = pd.read_csv('sepsis_dataset/preprocessed_dataset.csv.gz',compression='gzip')
model = joblib.load('model/rf_model.joblib')

app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True
print(model.feature_names_in_)
@app.route('/',methods=['POST','GET'])
def home():
    return "Welcome to Sepsis Prediction API click here to go to prediction page: /predict"

@app.route('/predict',methods=['POST'])
def predict():
    data = request.json
    Age = data['Age']
    Gender = data['Gender']
    HR = data['HR']
    O2Sat = data['O2Sat']
    Temp = data['Temp']
    SBP = data['SBP']
    MAP = data['MAP']
    DBP = data['DBP']
    Resp = data['Resp']
    Bun = data['BUN']
    Lactate = data['Lactate']
    Creatinine = data['Creatinine']
    Bilirubin_total = data['Bilirubin_total']
    Glucose = data['Glucose']
    WBC = data['WBC']
    
    # Prepare data for prediction
    input_data = pd.DataFrame({
        'Age': [Age],
        'Gender': [Gender], # Ensure the Gender is 0/1 in your data preprocessing
        'HR' : [HR], 
        'O2Sat' : [O2Sat],
        'Temp' : [Temp],
        'SBP' : [SBP],
        'MAP' : [MAP],
        'DBP' : [DBP],
        'Resp' : [Resp],
        'BUN' : [Bun],
        'Lactate' : [Lactate],
        'Creatinine' : [Creatinine],
        'Bilirubin_total' : [Bilirubin_total],
        'Glucose' : [Glucose],
        'WBC' : [WBC]
    })
    
    # Make predictions
    prediction = model.predict(input_data)
    probability = model.predict_proba(input_data)
    print(probability)
    if(int(prediction[0])==0):
        prediction="No Sepsis"
        outputstr = f" with a probability of {probability[0][0]*100:.2f}%"
    else:
        prediction="Sepsis"
        outputstr = f" with a probability of {probability[0][1]*100:.2f}%"
    
    result = {
        'prediction':prediction+outputstr
    }
    
    return jsonify(result)
    
if __name__ == "__main__":
    app.run()
