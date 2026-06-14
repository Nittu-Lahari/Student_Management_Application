from flask import Blueprint, request, jsonify
from database import get_connection
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/faculty/register', methods=['POST'])
def faculty_register():

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id
        FROM faculty
        WHERE email=%s
    """, (data['email'],))

    if cursor.fetchone():

        cursor.close()
        conn.close()

        return jsonify({
            "message":"Email already exists"
        }), 400

    hashed_password = generate_password_hash(
        data['password']
    )

    cursor.execute("""
        INSERT INTO faculty
        (name,email,phone,password)
        VALUES(%s,%s,%s,%s)
    """, (

        data['name'],
        data['email'],
        data['phone'],
        hashed_password

    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message":"Faculty Registered Successfully"
    })

@auth_bp.route('/faculty/login', methods=['POST'])
def faculty_login():

    data = request.json

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM faculty
        WHERE email=%s
    """, (data['email'],))

    faculty = cursor.fetchone()

    cursor.close()
    conn.close()

    if not faculty:

        return jsonify({
            "message":"Faculty not found"
        }), 404

    if not check_password_hash(
        faculty['password'],
        data['password']
    ):

        return jsonify({
            "message":"Invalid Password"
        }), 401

    return jsonify({

        "faculty_id":
        faculty['id'],

        "name":
        faculty['name'],

        "email":
        faculty['email'],

        "role":
        "faculty"

    })

@auth_bp.route('/student/register', methods=['POST'])
def student_register():

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id
        FROM students
        WHERE email=%s
    """, (data['email'],))

    if cursor.fetchone():

        cursor.close()
        conn.close()

        return jsonify({
            "message":"Email already exists"
        }), 400

    hashed_password = generate_password_hash(
        data['password']
    )

    cursor.execute("""
        INSERT INTO students
        (
            name,
            email,
            phone,
            password
        )
        VALUES(%s,%s,%s,%s)
    """, (

        data['name'],
        data['email'],
        data['phone'],
        hashed_password

    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message":"Student Registered Successfully"
    })

@auth_bp.route('/student/login', methods=['POST'])
def student_login():

    data = request.json

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM students
        WHERE email=%s
    """, (data['email'],))

    student = cursor.fetchone()

    cursor.close()
    conn.close()

    if not student:

        return jsonify({
            "message":"Student not found"
        }), 404

    if not check_password_hash(
        student['password'],
        data['password']
    ):

        return jsonify({
            "message":"Invalid Password"
        }), 401

    return jsonify({

        "student_id":
        student['id'],

        "name":
        student['name'],

        "email":
        student['email'],

        "role":
        "student"

    })
@auth_bp.route(
'/student/profile/<int:student_id>',
methods=['GET']
)
def get_student_profile(student_id):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            id,
            name,
            email,
            phone,
            class_name,
            section
        FROM students
        WHERE id=%s
    """, (student_id,))

    student = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify(student)
@auth_bp.route(
'/student/profile/<int:student_id>',
methods=['PUT']
)
def update_student_profile(student_id):

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE students
        SET
        name=%s,
        phone=%s,
        class_name=%s,
        section=%s
        WHERE id=%s
    """, (

        data['name'],
        data['phone'],
        data['class_name'],
        data['section'],
        student_id

    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message":"Profile Updated Successfully",
        "name": data['name']
    })

@auth_bp.route(
'/student/change-password/<int:student_id>',
methods=['PUT']
)
def change_student_password(student_id):

    data = request.json

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT password
        FROM students
        WHERE id=%s
    """, (student_id,))

    student = cursor.fetchone()

    if not check_password_hash(
        student['password'],
        data['current_password']
    ):

        cursor.close()
        conn.close()

        return jsonify({
            "message":
            "Current Password Incorrect"
        }), 400

    new_password = generate_password_hash(
        data['new_password']
    )

    cursor.execute("""
        UPDATE students
        SET password=%s
        WHERE id=%s
    """, (

        new_password,
        student_id

    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message":
        "Password Changed Successfully"
    })