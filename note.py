from sqlalchemy import Column, Text, Integer
from base import Base
from datetime import datetime

class Note(Base):

    __tablename__ = "note"
    id = Column(Integer, primary_key=True)
    author = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    date = Column(Text, nullable=False)
    createdAt = Column(Text, nullable=False)
    updatedAt = Column(Text, nullable=False)

    def __init__(self, author: str, content: str, date: str):
        self.author = author
        self.content = content
        self.date = date
        self.createdAt = datetime.now().strftime("%Y-%m-%d")
        self.updatedAt = datetime.now().strftime("%Y-%m-%d")


    def to_dict(self) -> dict:
        data = {"author": self.author, "content": self.content, "date": self.date,
                "createdAt": self.createdAt, "updatedAt": self.updatedAt}
        return data
