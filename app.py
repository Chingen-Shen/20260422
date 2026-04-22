import json
import random
import uuid
from flask import Flask, render_template, request, jsonify, session
from database import db, init_db, DrawHistory, MeritRecord
from sqlalchemy import func

app = Flask(__name__)
app.secret_key = "temple_oracle_secret_key"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/temple.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 初始化資料庫
init_db(app)

# 讀取籤詩資料庫
try:
    with open('data/poems.json', 'r', encoding='utf-8') as f:
        POEMS = json.load(f)
except FileNotFoundError:
    POEMS = []

@app.before_request
def ensure_user_id():
    """確保每個用戶都有一個唯一的識別碼"""
    if 'user_id' not in session:
        session['user_id'] = str(uuid.uuid4())

@app.route('/')
def index():
    """主頁面"""
    return render_template('index.html')

@app.route('/api/cast_jiaobei', methods=['POST'])
def cast_jiaobei():
    """
    模擬擲筊
    聖筊 (成功): 50%
    笑筊 (未知): 25%
    陰筊 (否定): 25%
    """
    rand = random.random()
    if rand < 0.5:
        result = "聖筊"
        code = "success"
    elif rand < 0.75:
        result = "笑筊"
        code = "maybe"
    else:
        result = "陰筊"
        code = "no"
    
    return jsonify({"result": result, "code": code})

@app.route('/api/draw_poem', methods=['POST'])
def draw_poem():
    """隨機抽取一個籤號 (1-60)"""
    poem_id = random.randint(1, 60)
    # 這裡可以從 POEMS 尋找對應內容，如果找不到則回傳編號
    poem_data = next((p for p in POEMS if p['id'] == poem_id), {"id": poem_id, "title": f"第{poem_id}籤"})
    return jsonify(poem_data)

@app.route('/api/save_record', methods=['POST'])
def save_record():
    """儲存抽籤歷史紀錄"""
    data = request.json
    new_record = DrawHistory(
        user_id=session['user_id'],
        category=data.get('category', '一般'),
        poem_id=data.get('poem_id'),
        user_name=data.get('user_name', '匿名信眾')
    )
    db.session.add(new_record)
    db.session.commit()
    return jsonify({"status": "success", "message": "紀錄已存入功德簿"})

@app.route('/api/gratitude', methods=['POST'])
def gratitude():
    """紀錄感恩次數與功德"""
    data = request.json
    new_merit = MeritRecord(
        user_id=session['user_id'],
        merit_points=1,
        comment=data.get('comment', '誠心感謝')
    )
    db.session.add(new_merit)
    db.session.commit()
    
    # 計算總功德點數
    total_merit = db.session.query(func.sum(MeritRecord.merit_points)).filter(MeritRecord.user_id == session['user_id']).scalar() or 0
    
    # 決定稱號
    if total_merit > 500:
        rank = "福緣居士"
    elif total_merit > 100:
        rank = "虔誠大德"
    else:
        rank = "初心信士"
        
    return jsonify({
        "status": "success", 
        "total_merit": total_merit,
        "rank": rank,
        "message": "神明已感受到你的虔誠心意"
    })

@app.route('/api/history', methods=['GET'])
def get_history():
    """取得當前用戶的抽籤歷史"""
    records = DrawHistory.query.filter_by(user_id=session['user_id']).order_by(DrawHistory.timestamp.desc()).all()
    history_list = []
    for r in records:
        history_list.append({
            "timestamp": r.timestamp.strftime("%Y-%m-%d %H:%M"),
            "category": r.category,
            "poem_id": r.poem_id
        })
    return jsonify(history_list)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
