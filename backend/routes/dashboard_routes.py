from flask import Blueprint, jsonify
from database import get_connection

dashboard_bp = Blueprint('dashboard_bp', __name__)

# total student 
@dashboard_bp.route('/dashboard/total-students', methods=['GET'])
def total_students():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT COUNT(*) FROM students"
    )

    count = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    return jsonify({
        "total_students": count
    })

# average marks
@dashboard_bp.route('/dashboard/average-marks', methods=['GET'])
def average_marks():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT AVG(marks) FROM marks"
    )

    avg_marks = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    return jsonify({
        "average_marks": round(avg_marks, 2) if avg_marks else 0
    })

# average attendance
@dashboard_bp.route('/dashboard/attendance-rate', methods=['GET'])
def attendance_rate():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
        (
            SUM(CASE WHEN status='Present' THEN 1 ELSE 0 END)
            *100.0
        )/COUNT(*)
        FROM attendance
    """)

    result = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    return jsonify({
        "attendance_rate":
        round(result,2) if result else 0
    })
# attendance summary
@dashboard_bp.route('/dashboard/attendance-summary')
def attendance_summary():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
        status,
        COUNT(*) as total
        FROM attendance
        GROUP BY status
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)
# top performers
@dashboard_bp.route('/dashboard/top-performers', methods=['GET'])
def top_performers():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            s.id,
            s.name,
            AVG(m.marks) AS average_marks

        FROM students s
        JOIN marks m
        ON s.id = m.student_id

        GROUP BY s.id

        ORDER BY average_marks DESC

        LIMIT 5
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)