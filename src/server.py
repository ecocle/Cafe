import os
import pymysql
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='dist', static_url_path='')


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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
