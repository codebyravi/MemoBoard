from memoboard import db
from datetime import datetime


class MemoList(db.Model):
    __tablename__ = 'lists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    added = db.Column(db.DateTime, default=datetime.utcnow)

    items = db.relationship('MemoItem', backref=db.backref('list', lazy='joined'), lazy='dynamic')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<MemoList %d>' % self.id


class MemoItem(db.Model):
    __tablename__ = 'list_items'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    added = db.Column(db.DateTime, default=datetime.utcnow)

    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), index=True)

    def __init__(self, content):
        self.content = content

    def __repr__(self):
        return '<MemoItem %d>' % self.id

