from flask import Blueprint, request, jsonify
from database import get_connection

marks_bp = Blueprint('marks_bp', __name__)

# add marks
@marks_bp.route('/marks', methods=['POST'])
def add_marks():

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO marks
    (student_id, subject, marks)
    VALUES (%s,%s,%s)
    """

    values = (
        data['student_id'],
        data['subject'],
        data['marks']
    )

    cursor.execute(query, values)

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Marks added successfully"
    })

# view marks
@marks_bp.route('/marks', methods=['GET'])
def get_marks():

    student_id = request.args.get('student_id')
    subject = request.args.get('subject')

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT
            m.id,
            s.id AS student_id,
            s.name,
            m.subject,
            m.marks
        FROM marks m
        JOIN students s
        ON m.student_id = s.id
        WHERE 1=1
    """

    values = []

    if student_id:
        query += " AND s.id = %s"
        values.append(student_id)

    if subject:
        query += " AND m.subject = %s"
        values.append(subject)

    query += " ORDER BY s.name"

    cursor.execute(query, values)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)

# subject wise marks
@marks_bp.route('/marks/<int:student_id>', methods=['GET'])
def get_student_marks(student_id):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT subject, marks
        FROM marks
        WHERE student_id=%s
    """, (student_id,))

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)

@marks_bp.route('/subjects', methods=['GET'])
def get_subjects():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT DISTINCT subject
        FROM marks
        ORDER BY subject
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)

@marks_bp.route('/marks-summary', methods=['GET'])
def marks_summary():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT

        COUNT(*) AS total_records,

        MAX(marks) AS highest_marks,

        ROUND(AVG(marks),2)
        AS average_marks

        FROM marks
    """)

    data = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify(data)

@marks_bp.route('/marks/<int:id>', methods=['PUT'])
def update_marks(id):

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE marks
        SET
        student_id=%s,
        subject=%s,
        marks=%s
        WHERE id=%s
    """, (

        data['student_id'],
        data['subject'],
        data['marks'],
        id

    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message":
        "Marks Updated Successfully"
    })

@marks_bp.route('/marks/<int:id>', methods=['DELETE'])
def delete_marks(id):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        DELETE FROM marks
        WHERE id=%s
    """, (id,))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Marks Deleted Successfully"
    })

@marks_bp.route('/student/marks/<int:student_id>',methods=['GET'])
def get_student_marks_summary(student_id):

    conn = get_connection()

    cursor = conn.cursor(
        dictionary=True
    )

    cursor.execute("""
        SELECT
            subject,
            marks

        FROM marks

        WHERE student_id=%s

        ORDER BY subject
    """, (student_id,))

    marks_data = cursor.fetchall()

    cursor.execute("""
        SELECT

        ROUND(
            AVG(marks),
            2
        ) AS average_marks

        FROM marks

        WHERE student_id=%s
    """, (student_id,))

    average = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify({

        "marks":
        marks_data,

        "average_marks":

        average['average_marks']

        if average['average_marks']

        else 0

    })