from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, JWTManager, create_access_token  # type: ignore
from flask_bcrypt import Bcrypt  # type: ignore
import pymysql  

# Initialize authentication components
auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()
jwt = JWTManager()

# Function to get a database connection
def get_db_connection():
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',  # your password
        database='techtrack'
    )
    return connection

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create a database connection
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute('INSERT INTO users(email, name, password) VALUES(%s, %s, %s)', (email, name, hashed_password))
        connection.commit()
    except pymysql.MySQLError as err:
        return jsonify({"message": f"Error: {err}"}), 500
    finally:
        cursor.close()
        connection.close()

    return jsonify({"message": "User created successfully!"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Create a database connection
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
    user = cursor.fetchone()
    cursor.close()
    connection.close()

    if user and bcrypt.check_password_hash(user[2], password):
        # Generate JWT token
        access_token = create_access_token(identity=email)
        return jsonify({"name":user[1], "access_token": access_token}), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401
    

# @auth_bp.route('/reset', methods=['POST'])
# def reset():
#     data = request.get_json()
#     email = data.get('email')
#     new_password = data.get('new_password')

#     # Validate input
#     if not email or not new_password:
#         return jsonify({"message": "Email and new password are required"}), 400

#     # Hash the new password
#     hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

#     # Create a database connection
#     connection = get_db_connection()
#     cursor = connection.cursor()

#     try:
#         # Check if the user exists
#         cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
#         user = cursor.fetchone()

#         if not user:
#             return jsonify({"message": "User not found"}), 404

#         # Update the password in the database
#         cursor.execute('UPDATE users SET password = %s WHERE email = %s', (hashed_password, email))
#         connection.commit()

#         return jsonify({"message": "Password reset successfully"}), 200
#     except pymysql.MySQLError as err:
#         return jsonify({"message": f"Database error: {err}"}), 500
#     finally:
#         cursor.close()
#         connection.close()



# @auth_bp.route('/protected', methods=['GET'])
# @jwt_required()
# def protected():
#     return jsonify({"message": "This is a protected route!"}), 200


import random
import string
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email credentials for sending the reset password email
EMAIL_ADDRESS = "abdulahadneduet@gmail.com"  # Replace with your email address
EMAIL_PASSWORD = "bxbm rtrw dxie xyvv"    # Replace with your email password

@auth_bp.route('/reset', methods=['POST'])
def reset():
    data = request.get_json()
    email = data.get('email')

    # Validate input
    if not email:
        return jsonify({"message": "Email is required"}), 400

    # Create a database connection
    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        # Check if the user exists
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"message": "User not found"}), 404

        # Generate an 8-character random password
        new_password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))

        # Hash the new password
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

        # Update the password in the database
        cursor.execute('UPDATE users SET password = %s WHERE email = %s', (hashed_password, email))
        connection.commit()

        # Send the new password to the user's email
        send_email(email, new_password)

        return jsonify({"message": "Password reset successfully, please check your email"}), 200
    except pymysql.MySQLError as err:
        return jsonify({"message": f"Database error: {err}"}), 500
    finally:
        cursor.close()
        connection.close()


def send_email(to_email, new_password):
    """
    Sends an email containing the new password to the specified email address.
    """
    try:
        # Create the email content
        subject = "Your Password Has Been Reset"
        body = f"Hello,\n\nYour new password is: {new_password}\n\nPlease use this password to log in and consider changing it after logging in."

        # Set up the MIME structure for the email
        message = MIMEMultipart()
        message['From'] = EMAIL_ADDRESS
        message['To'] = to_email
        message['Subject'] = subject

        # Attach the email body
        message.attach(MIMEText(body, 'plain'))

        # Connect to the SMTP server and send the email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Upgrade the connection to secure
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(message)

        print(f"Password reset email sent to {to_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise
