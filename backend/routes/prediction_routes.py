from flask import Blueprint, request, jsonify
from database import get_connection
import joblib

prediction_bp = Blueprint('prediction_bp',__name__)

import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "ml", "model.pkl")

model = joblib.load(MODEL_PATH)

@prediction_bp.route(
    '/predict',
    methods=['POST']
)
def predict():

    data = request.json

    attendance = data['attendance']
    assignment = data['assignment']
    marks = data['marks']

    result = model.predict([
        [
            attendance,
            assignment,
            marks
        ]
    ])

    return jsonify({
        "prediction": result[0]
    })
@prediction_bp.route(
'/student/prediction/<int:student_id>',
methods=['GET']
)
def get_student_prediction(student_id):

    conn = get_connection()

    cursor = conn.cursor(
        dictionary=True
    )

    # Attendance %

    cursor.execute("""
        SELECT

        ROUND(
            (
                SUM(
                    CASE
                    WHEN status='Present'
                    THEN 1
                    ELSE 0
                    END
                )
                /
                COUNT(*)
            ) * 100,
            2
        ) AS attendance_percentage

        FROM attendance

        WHERE student_id=%s
    """, (student_id,))

    attendance = cursor.fetchone()

    # Average Marks

    cursor.execute("""
        SELECT

        ROUND(
            AVG(marks),
            2
        ) AS average_marks

        FROM marks

        WHERE student_id=%s
    """, (student_id,))

    marks = cursor.fetchone()

    attendance_percentage = (
        attendance['attendance_percentage']
        if attendance['attendance_percentage']
        else 0
    )

    average_marks = (
        marks['average_marks']
        if marks['average_marks']
        else 0
    )
    attendance_percentage = float(attendance_percentage or 0)
    average_marks = float(average_marks or 0)
    
    score = (
        attendance_percentage * 0.4
        +
        average_marks * 0.6
    )

    if score >= 85:
        prediction = "Excellent"
    elif score >= 70:
        prediction = "Good"
    elif score >= 50:
        prediction = "Average"
    else:
        prediction = "Needs Improvement"

    cursor.close()
    conn.close()

    return jsonify({

        "attendance_percentage":
        attendance_percentage,

        "average_marks":
        average_marks,

        "prediction":
        prediction

    })