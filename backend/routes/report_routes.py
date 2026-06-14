from flask import Blueprint, jsonify
from database import get_connection
from report_generator import generate_report
import joblib
import os

report_bp = Blueprint(
    'report_bp',
    __name__
)


BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "ml", "model.pkl")

model = joblib.load(MODEL_PATH)

# generate student report
@report_bp.route('/report/<int:student_id>',methods=['GET'])
def student_report(student_id):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # fetch student details
    cursor.execute("""
        SELECT name
        FROM students
        WHERE id=%s
    """,(student_id,))

    student = cursor.fetchone()

    # calculate average marks
    cursor.execute("""
        SELECT AVG(marks)
        AS avg_marks
        FROM marks
        WHERE student_id=%s
    """,(student_id,))

    avg_marks = cursor.fetchone()[
        'avg_marks'
    ]

    # calculate attendance
    cursor.execute("""
        SELECT
        (
            SUM(
                CASE
                WHEN status='Present'
                THEN 1
                ELSE 0
                END
            ) *100.0
        )/COUNT(*)
        AS attendance_rate

        FROM attendance

        WHERE student_id=%s
    """,(student_id,))

    attendance = cursor.fetchone()[
        'attendance_rate'
    ]
    # temporatory assignment score
    assignment_score = 80

    # predict performance
    prediction = model.predict(
        [[
            attendance,
            assignment_score,
            avg_marks
        ]]
    )[0]

    # create prompt
    prompt = f"""
Generate a detailed student
performance report.

Student Name:
{student['name']}

Attendance:
{attendance}

Average Marks:
{avg_marks}

Performance Category:
{prediction}

Include:

1. Strengths
2. Weaknesses
3. Recommendations
4. Overall Summary

Keep the report professional.
"""
    # generate ai report
    report = generate_report(
        student['name'],
        attendance,
        avg_marks,
        prediction
    )
    cursor.close()
    conn.close()

    return jsonify({
        "student": student['name'],
        "prediction": prediction,
        "report": report
    })


@report_bp.route('/student/report/<int:student_id>',methods=['GET'])

def get_student_ai_report(student_id):

    conn = get_connection()

    cursor = conn.cursor(
        dictionary=True
    )

    cursor.execute("""
        SELECT
        name
        FROM students
        WHERE id=%s
    """, (student_id,))

    student = cursor.fetchone()

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

    average_marks = (
        marks['average_marks']
        if marks['average_marks']
        else 0
    )

    attendance_percentage = (
        attendance['attendance_percentage']
        if attendance['attendance_percentage']
        else 0
    )
    attendance_percentage = float(attendance_percentage or 0)
    average_marks = float(average_marks or 0)
    
    score = (
        average_marks * 0.6
        +
        attendance_percentage * 0.4
    )

    if score >= 85:

        prediction = "Excellent"

        strengths = [
            "Excellent Attendance",
            "Strong Academic Performance"
        ]

        improvements = [
            "Maintain Current Performance"
        ]

    elif score >= 70:

        prediction = "Good"

        strengths = [
            "Good Consistency"
        ]

        improvements = [
            "Increase Subject Practice"
        ]

    else:

        prediction = "Needs Improvement"

        strengths = [
            "Potential To Improve"
        ]

        improvements = [
            "Focus On Weak Subjects",
            "Improve Attendance"
        ]

    cursor.close()
    conn.close()

    return jsonify({

        "student_name":
        student['name'],

        "attendance":
        attendance_percentage,

        "average_marks":
        average_marks,

        "prediction":
        prediction,

        "strengths":
        strengths,

        "improvements":
        improvements

    })