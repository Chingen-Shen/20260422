from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class DrawHistory(db.Model):
    """抽籤歷史紀錄模型"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), nullable=False, index=True)
    timestamp = db.Column(db.DateTime, default=datetime.now)
    category = db.Column(db.String(50))
    poem_id = db.Column(db.Integer, nullable=False)
    user_name = db.Column(db.String(50))

class MeritRecord(db.Model):
    """感恩功德紀錄模型"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), nullable=False, index=True)
    timestamp = db.Column(db.DateTime, default=datetime.now)
    merit_points = db.Column(db.Integer, default=1)
    comment = db.Column(db.String(200))

def init_db(app):
    """初始化資料庫"""
    db.init_app(app)
    with app.app_context():
        db.create_all()
