from flask import Flask
from flask_cors import CORS

from routes.student_routes import student_bp
from routes.attendance_routes import attendance_bp
from routes.marks_routes import marks_bp
from routes.dashboard_routes import dashboard_bp
from routes.prediction_routes import prediction_bp
from routes.report_routes import report_bp
from routes.auth_routes import auth_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(auth_bp)

app.register_blueprint(student_bp)

app.register_blueprint(attendance_bp)

app.register_blueprint(marks_bp)

app.register_blueprint(dashboard_bp)

app.register_blueprint(
    prediction_bp
)

app.register_blueprint(
    report_bp
)

# if __name__ == "__main__":
#     app.run(debug=True)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000
    )