import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib

data = pd.read_csv("dataset.csv")

X = data[['Attendance','Assignment','Marks']]
y = data['Performance']

model = DecisionTreeClassifier()

model.fit(X,y)

joblib.dump(model,'model.pkl')

print("Model trained successfully")