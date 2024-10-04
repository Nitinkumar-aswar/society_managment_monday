from flask import Flask, jsonify, request, session, send_from_directory
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
import bcrypt
from flask_mysqldb import MySQL
from flask_cors import CORS
import os
from email_validator import validate_email, EmailNotValidError

app = Flask(__name__, 
            static_folder='../Frontend/myapp/build',
            static_url_path='/')

# MySQL Configuration
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Prevent JavaScript access to cookies
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Or 'None' if cross-site cookies are required
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production with HTTPS
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'registerdatabase'
app.secret_key = os.getenv('SECRET_KEY', os.urandom(24))

mysql = MySQL(app)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Forms and Validation
class RegisterForm(FlaskForm):
    username = StringField("Name", validators=[DataRequired()])
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Register")

    def validate_email(self, field):
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM register WHERE email=%s", (field.data,))
        user = cursor.fetchone()
        cursor.close()
        if user:
            raise ValidationError('Email already taken.')

class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Login")

# Serve React frontend
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Validate inputs
    if not all([username, email, password]):
        return jsonify({'errors': ['All fields are required']}), 400

    if len(password) < 8:
        return jsonify({'errors': ['Password must be at least 8 characters long']}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO register (username, email, password) VALUES (%s, %s, %s)",
                       (username, email, hashed_password))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Registration successful'}), 201
    except Exception as e:
        return jsonify({'message': 'An error occurred: ' + str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'message': 'Email and password are required.'}), 400

    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM register WHERE email=%s", (email,))
        user = cursor.fetchone()
        cursor.close()
    except Exception as e:
        return jsonify({'message': 'Database query error: ' + str(e)}), 500

    if user and bcrypt.checkpw(password.encode('utf-8'), user[3].encode('utf-8')):
        session['user_id'] = user[0]
        return jsonify({'message': 'Login successful', 'user_id': user[0]}), 200
    else:
        return jsonify({'message': 'Invalid credentials.'}), 401


@app.route('/userdashboard', methods=['GET'])
def dashboard():
    if 'user_id' in session:
        user_id = session['user_id']
        try:
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM register WHERE id=%s", (user_id,))
            user = cursor.fetchone()
            cursor.close()

            if user:
                return jsonify({'user': {'name': user[1], 'email': user[2]}}), 200
        except Exception as e:
            return jsonify({'message': 'Database query error: ' + str(e)}), 500

    return jsonify({'message': 'Unauthorized'}), 401


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'You have been logged out successfully.'}), 200

# Fallback for React Router
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
