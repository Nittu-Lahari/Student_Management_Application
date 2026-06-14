from flask import Blueprint, request, jsonify
from database import get_connection

student_bp = Blueprint('student_bp', __name__)

@student_bp.route('/students', methods=['POST'])
def add_student():

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO students
    (name,email,class_name,section,phone)
    VALUES (%s,%s,%s,%s,%s)
    """

    values = (
        data['name'],
        data['email'],
        data['class_name'],
        data['section'],
        data['phone']
    )

    cursor.execute(query, values)

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Student added successfully"
    })

@student_bp.route('/students', methods=['GET'])
def get_students():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM students")

    students = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(students)

@student_bp.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM students WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Student deleted"
    })
@student_bp.route('/students/<int:id>', methods=['PUT'])
def update_student(id):

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    UPDATE students
    SET name=%s,
        email=%s,
        class_name=%s,
        section=%s,
        phone=%s
    WHERE id=%s
    """

    values = (
        data['name'],
        data['email'],
        data['class_name'],
        data['section'],
        data['phone'],
        id
    )

    cursor.execute(query, values)

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Student updated successfully"
    })