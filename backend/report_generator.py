def generate_report(
        student_name,
        attendance,
        avg_marks,
        prediction):

    report = f"""
Student Performance Report

Student Name: {student_name}

Attendance Percentage: {attendance:.2f}%

Average Marks: {avg_marks:.2f}

Performance Category: {prediction}

Strengths:
- Regular participation in academics
- Good learning potential

Areas for Improvement:
- Improve consistency
- Focus on weak subjects

Recommendations:
- Practice coding daily
- Solve aptitude questions
- Maintain attendance above 90%

Overall Summary:
The student is categorized as {prediction}.
With continuous effort and disciplined study,
academic performance can improve further.
"""

    return report