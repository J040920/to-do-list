import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS
 
app = Flask(__name__)
CORS(app)
 
# Configuração do MySQL
DB_CONFIG = {
    'host': 'localhost',
    'user': 'seu_usuario',
    'password': 'sua_senha',
    'database': 'todo_db'
}
 
def get_db():
    return mysql.connector.connect(**DB_CONFIG)
 
@app.route('/tasks', methods=['GET'])
def get_tasks():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tasks ORDER BY id DESC')
    tasks = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(tasks)
 
@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO tasks (text) VALUES (%s)', (data['text'],))
    db.commit()
    cursor.close()
    db.close()
    return '', 201
 
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    db = get_db()
    cursor = db.cursor()
    cursor.execute('UPDATE tasks SET text=%s WHERE id=%s', (data['text'], task_id))
    db.commit()
    cursor.close()
    db.close()
    return '', 204
 
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM tasks WHERE id=%s', (task_id,))
    db.commit()
    cursor.close()
    db.close()
    return '', 204
 
if __name__ == '__main__':
    app.run(debug=True)
 