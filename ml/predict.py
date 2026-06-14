import joblib

model = joblib.load("model.pkl")

result = model.predict([[58,50,48]])

print(result[0])