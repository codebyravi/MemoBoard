from memoboard import db
from datetime import datetime


class MemoList(db.Model):
    __tablename__ = 'lists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    added = db.Column(db.DateTime)

    items = db.relationship('MemoItem', backref=db.backref('list', lazy='joined'), lazy='dynamic')

    def __init__(self, name,
                 added=datetime.now().replace(microsecond=0)):
        self.name = name
        self.added = added

    def __repr__(self):
        return '<MemoList %d>' % self.id


class MemoItem(db.Model):
    __tablename__ = 'list_items'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    added = db.Column(db.DateTime)

    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), index=True)

    def __init__(self, content,
                 added=datetime.now().replace(microsecond=0)):
        self.content = content
        self.added = added

    def __repr__(self):
        return '<MemoItem %d>' % self.id