import os
import pymysql
from flask import Flask, send_from_directory, request, jsonify, session
import jwt

app = Flask(__name__, static_folder='dist', static_url_path='')
app.secret_key = os.urandom(24)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/dataCoffee', methods=['GET'])
def get_data_coffee():
    conn = pymysql.connect(host="119.29.236.82", user="root", password="Shawn090209!", database="Coffee_Orders",
                           charset="utf8")
    cursor = conn.cursor()
    sql = "SELECT * FROM Coffee"
    cursor.execute(sql)
    result = cursor.fetchall()
    conn.commit()
    cursor.close()
    conn.close()
    return {'data': result}


@app.route('/api/dataCaffeineFree', methods=['GET'])
def get_data_caffeine_free():
    conn = pymysql.connect(host="119.29.236.82", user="root", password="Shawn090209!", database="Coffee_Orders",
                           charset="utf8")
    cursor = conn.cursor()
    sql = "SELECT * FROM Caffeine_free"
    cursor.execute(sql)
    result = cursor.fetchall()
    conn.commit()
    cursor.close()
    conn.close()
    return {'data': result}


@app.route('/api/dataBreakfast', methods=['GET'])
def get_data_breakfast():
    conn = pymysql.connect(host="119.29.236.82", user="root", password="Shawn090209!", database="Coffee_Orders",
                           charset="utf8")
    cursor = conn.cursor()
    sql = "SELECT * FROM Breakfast"
    cursor.execute(sql)
    result = cursor.fetchall()
    conn.commit()
    cursor.close()
    conn.close()
    return {'data': result}


@app.route('/api/orders', methods=['POST'])
def handle_order():
    data = request.get_json()

    selected_toppings = ','.join(data['selectedToppings']) if data['selectedToppings'] else ''
    charles = f"{data['name']}, {data['selectedSize']}, {selected_toppings}, {data['price']}"

    values = (
        data['firstName'],
        data['lastName'],
        data['name'],
        data['temperature'],
        data['selectedSize'],
        selected_toppings,
        data['price'],
        data['comments'],
        data['useCup'],
        charles,
    )

    sql = """
        INSERT INTO Orders (
            First_name, 
            Last_name, 
            Coffee_type, 
            Temperature, 
            Size, 
            Toppings, 
            Price, 
            Order_time, 
            Comments, 
            Cup, 
            CHARLES
        ) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), %s, %s, %s)
    """

    conn = pymysql.connect(host="119.29.236.82", user="root", password="Shawn090209!", database="Coffee_Orders",
                           charset="utf8")
    cursor = conn.cursor()

    try:
        cursor.execute(sql, values)

        username = session.get('username')
        if username:
            cursor.execute("UPDATE Accounts SET Balance = %s WHERE User_name = %s", (data['balance'], username))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Order placed successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/addMoneyToAcc')
def add_monet_to_acc():
    data = request.get_json()

    amount = data['amount']

    conn = pymysql.connect(host="119.29.236.82", user="root", password="Shawn090209!", database="Coffee_Orders",
                           charset="utf8")
    cursor = conn.cursor()

    try:
        username = session.get('username')
        if username:
            cursor.execute("UPDATE Accounts SET Balance = Balance + %s WHERE User_name = %s;", (amount, username))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Amount added to account'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/api/login', methods=['POST'])
def handle_login():
    data = request.get_json()

    username = data['username']
    password = data['password']

    conn = pymysql.connect(host="119.29.236.82", user="root", password="Shawn090209!", database="Coffee_Orders",
                           charset="utf8")

    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM Accounts WHERE User_name=%s AND Password=%s"
            cursor.execute(sql, (username, password))
            user = cursor.fetchone()

            if user:
                session['username'] = username
                token = jwt.encode({'username': username}, 'SECRET_KEY', algorithm='HS256')
                response = jsonify({'message': 'Login successful', 'username': username, 'token': token})
                response.set_cookie('access_token', token, max_age=60 * 60 * 24 * 30)
                return response
            else:
                return jsonify({'error': 'Invalid username or password'})

    finally:
        conn.close()


@app.route('/api/register', methods=['POST'])
def handle_register():
    data = request.get_json()

    username = data['username']
    password = data['password']

    createAccount = (
        username,
        password,
    )

    conn = pymysql.connect(host="119.29.236.82", user="root", password="Shawn090209!", database="Coffee_Orders",
                           charset="utf8")

    try:
        with conn.cursor() as cursor:
            # Check if the username already exists
            sql = "SELECT * FROM Accounts WHERE User_name = %s"
            cursor.execute(sql, (username,))
            existing_user = cursor.fetchone()

            if existing_user:
                return jsonify({"error": "Username already exists"}), 400

            # If username doesn't exist, proceed with account creation
            sql = "INSERT INTO Accounts (User_name, Password) values (%s, %s)"
            cursor.execute(sql, createAccount)
            conn.commit()

            return jsonify({"message": "Account created successfully(server)"}), 201

    finally:
        conn.close()


@app.route('/api/user_data', methods=['GET'])
def get_user_data():
    # Assuming you have a session variable 'username' set
    username = session.get('username')

    if username:
        conn = pymysql.connect(host="119.29.236.82", user="root", password="Shawn090209!", database="Coffee_Orders",
                               charset="utf8")
        cursor = conn.cursor()
        sql = "SELECT User_name, Balance FROM Accounts WHERE User_name=%s"
        cursor.execute(sql, (username,))
        user_data = cursor.fetchone()
        conn.close()

        if user_data:
            return jsonify({'username': user_data[0], 'balance': user_data[1]})
        else:
            return jsonify({'error': 'User data not found'}), 404
    else:
        return jsonify({'error': 'User not logged in'}), 401


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
