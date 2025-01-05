from flask import Flask,request, jsonify
from auth import auth_bp  # Import authentication blueprint
from ml_model import recommend_courses
from database import load_data_from_db
from flask_jwt_extended import JWTManager # type: ignore
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)



# Configure your application (MySQL, JWT, etc.)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'techtrack'
app.config['SECRET_KEY'] = '22139'  # Change to a secure random string
app.config['JWT_SECRET_KEY'] = '22139'  # Optional

# Initialize JWT Manager
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


@app.route('/recommend_courses', methods=['POST'])
def recommend_courses_endpoint():
    data = request.get_json()
    keywords = data.get('keywords')

    # Load the data from the database
    courses_data = load_data_from_db()

    # Get recommendations
    recommended_courses = recommend_courses(courses_data, keywords)

    if not recommended_courses.empty:
        recommendations = recommended_courses.to_dict(orient='records')  # Convert DataFrame to dictionary
        return jsonify(recommendations), 200
    else:
        return jsonify({"message": "No courses found matching your criteria."}), 404

if __name__ == '__main__':
    app.run(debug=True)
