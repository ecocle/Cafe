import os
import pymysql
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='dist', static_url_path='')

# Create a connection to your MySQL database
connection = pymysql.connect(
    host='119.29.236.82',
    user='root',
    password='Shawn090209!',
    db='Coffee_Orders',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/dataCoffee', methods=['GET'])
def get_data():
    try:
        with connection.cursor() as cursor:
            # Execute your SQL query
            sql = "SELECT * FROM Coffee"
            cursor.execute(sql)
            result = cursor.fetchall()
            return {'data': result}
    except Exception as e:
        return {'error': str(e)}


@app.route('/api/dataCaffeineFree', methods=['GET'])
def get_data():
    try:
        with connection.cursor() as cursor:
            # Execute your SQL query
            sql = "SELECT * FROM Caffeine_free"
            cursor.execute(sql)
            result = cursor.fetchall()
            return {'data': result}
    except Exception as e:
        return {'error': str(e)}


@app.route('/api/dataBreakfast', methods=['GET'])
def get_data():
    try:
        with connection.cursor() as cursor:
            # Execute your SQL query
            sql = "SELECT * FROM Breakfast"
            cursor.execute(sql)
            result = cursor.fetchall()
            return {'data': result}
    except Exception as e:
        return {'error': str(e)}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
