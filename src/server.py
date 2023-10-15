import os

import bcrypt
import jwt
import pymysql
from flask import Flask, send_from_directory, request, jsonify, session
from flask_cors import CORS

app = Flask(__name__, static_folder='../dist', static_url_path='')
CORS(app, supports_credentials=True)
app.secret_key = os.urandom(32)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/dataCoffee', methods=['GET'])
def get_data_coffee():
    conn = pymysql.connect(host="172.16.13.205", user="root", password="Shawn090209", database="Coffee_Orders",
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
    conn = pymysql.connect(host="172.16.13.205", user="root", password="Shawn090209", database="Coffee_Orders",
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
    conn = pymysql.connect(host="172.16.13.205", user="root", password="Shawn090209", database="Coffee_Orders",
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

    conn = pymysql.connect(host="172.16.13.205", user="root", password="Shawn090209", database="Coffee_Orders",
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


@app.route('/api/addMoneyToAcc', methods=['POST'])
def add_monet_to_acc():
    data = request.get_json()

    username = session.get('username')
    amount = data['amount']

    print(amount, username)

    conn = pymysql.connect(host="172.16.13.205", user="root", password="Shawn090209", database="Coffee_Orders",
                           charset="utf8")
    cursor = conn.cursor()

    try:
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
    password = data['password'].encode('utf-8')

    conn = pymysql.connect(host="172.16.13.205", user="root", password="Shawn090209", database="Coffee_Orders",
                           charset="utf8")

    try:
        with conn.cursor() as cursor:
            sql = "SELECT Password FROM Accounts WHERE User_name=%s"
            cursor.execute(sql, username)
            result = cursor.fetchone()

            if result:
                storedHashedPassword = result[0].encode('utf-8')

                if bcrypt.checkpw(password, storedHashedPassword):
                    session['username'] = username
                    token = jwt.encode({'username': username}, 'SECRET_KEY', algorithm='HS256')
                    response = jsonify({'message': 'Login successful', 'username': username, 'token': token})
                    response.set_cookie('access_token', token, max_age=60 * 60 * 24 * 30)
                    return response
                else:
                    return jsonify({'error': 'Invalid username or password'}), 404
            else:
                return jsonify({'error': 'Invalid username or password'}), 404

    finally:
        conn.close()


@app.route('/api/register', methods=['POST'])
def handle_register():
    data = request.get_json()

    username = data['username']
    password = data['password'].encode('utf-8')

    salt = bcrypt.gensalt()
    hashedPassword = bcrypt.hashpw(password, salt)

    createAccount = (
        username,
        hashedPassword,
    )

    conn = pymysql.connect(host="172.16.13.205", user="root", password="Shawn090209", database="Coffee_Orders",
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
    username = session.get('username')

    if username:
        conn = pymysql.connect(host="172.16.13.205", user="root", password="Shawn090209", database="Coffee_Orders",
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


@app.route('/api/admin/orders', methods=['GET'])
def get_admin_orders():
    conn = pymysql.connect(host="172.16.13.205", user="root", password="Shawn090209", database="Coffee_Orders",
                           charset="utf8")
    cursor = conn.cursor()
    sql = "SELECT * FROM Orders ORDER BY order_time DESC"
    cursor.execute(sql)
    orders_data = cursor.fetchall()
    conn.close()

    return jsonify({'data': orders_data})


@app.route('/api/admin/ordersNormal', methods=['GET'])
def get_normal_orders():
    username = session.get('username')

    conn = pymysql.connect(host="172.16.13.205", user="root", password="Shawn090209", database="Coffee_Orders",
                           charset="utf8")
    cursor = conn.cursor()
    sql = "SELECT * FROM Orders Where First_name=%s ORDER BY order_time DESC"
    cursor.execute(sql, username)
    orders_data = cursor.fetchall()
    conn.close()

    return jsonify({'data': orders_data})


@app.route('/api/admin/updateOrder', methods=['PUT'])
def update_order():
    updated_order = request.json
    updated_order_id = updated_order['id']

    conn = pymysql.connect(host="172.16.13.205", user="root", password="Shawn090209", database="Coffee_Orders",
                           charset="utf8")
    cursor = conn.cursor()

    try:
        sql = "SELECT * FROM Orders WHERE id = %s"
        cursor.execute(sql, (updated_order_id,))
        existing_order = cursor.fetchone()

        if existing_order:
            sql = """
                UPDATE Orders
                SET 
                    First_name = %s,
                    Last_name = %s,
                    Coffee_type = %s,
                    Temperature = %s,
                    Toppings = %s,
                    Size = %s,
                    Price = %s,
                    Comments = %s,
                    Cup = %s,
                    CHARLES = %s
                WHERE ID = %s
            """

            cursor.execute(
                sql,
                (
                    updated_order['first_name'],
                    updated_order['last_name'],
                    updated_order['coffee_type'],
                    updated_order['temperature'],
                    updated_order['toppings'],
                    updated_order['size'],
                    updated_order['price'],
                    updated_order['comments'],
                    updated_order['cup'],
                    updated_order['charles'],
                    updated_order_id,
                ),
            )
            conn.commit()

            return jsonify({'status': 'success', 'message': 'Order updated successfully'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'Order not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': str(e)}), 500
    finally:
        cursor.close()
        conn.close()


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
