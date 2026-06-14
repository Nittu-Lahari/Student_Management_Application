from flask import Blueprint, request, jsonify
from database import get_connection

attendance_bp = Blueprint('attendance_bp', __name__)

@attendance_bp.route('/attendance', methods=['POST'])
def mark_attendance():

    data = request.json

    student_id = data['student_id']
    attendance_date = data['attendance_date']
    status = data['status']

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id
        FROM attendance
        WHERE student_id=%s
        AND attendance_date=%s
    """, (student_id, attendance_date))

    existing = cursor.fetchone()

    if existing:

        cursor.execute("""
            UPDATE attendance
            SET status=%s
            WHERE student_id=%s
            AND attendance_date=%s
        """, (status, student_id, attendance_date))

        message = "Attendance Updated Successfully"

    else:

        cursor.execute("""
            INSERT INTO attendance
            (student_id, attendance_date, status)
            VALUES (%s,%s,%s)
        """, (student_id, attendance_date, status))

        message = "Attendance Marked Successfully"

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": message
    })

@attendance_bp.route('/attendance/<date>', methods=['GET'])
def get_attendance_by_date(date):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            s.id,
            s.name,
            s.class_name,
            s.section,
            COALESCE(a.status, 'Not Marked') AS status

        FROM students s

        LEFT JOIN attendance a
        ON s.id = a.student_id
        AND a.attendance_date = %s

        ORDER BY s.name
    """, (date,))

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)

@attendance_bp.route('/attendance', methods=['GET'])
def get_attendance():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT a.id,
               s.name,
               a.attendance_date,
               a.status
        FROM attendance a
        JOIN students s
        ON a.student_id = s.id
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)
@attendance_bp.route(
'/student/attendance/<int:student_id>',
methods=['GET']
)
def get_student_attendance(student_id):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            attendance_date,
            status
        FROM attendance
        WHERE student_id=%s
        ORDER BY attendance_date DESC
    """, (student_id,))

    attendance = cursor.fetchall()

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
        ) AS percentage

        FROM attendance

        WHERE student_id=%s
    """, (student_id,))

    percentage = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify({
        "attendance": attendance,
        "percentage":
        percentage['percentage']
        if percentage['percentage']
        else 0
    })