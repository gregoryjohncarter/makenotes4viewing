from server.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Media(Base):
  __tablename__ = 'medias'
  id = Column(Integer, primary_key=True)
  imdbID = Column(String(100), nullable=False)
  title = Column(String(100), nullable=False)
  poster = Column(String(100), nullable=False)
  year = Column(String(100), nullable=False)
  contentRating = Column(String(100), nullable=False)
  genre = Column(String(100), nullable=False)
  stars = Column(String(100), nullable=False)
  plot = Column(String(500), nullable=False)
  director = Column(String(100), nullable=False)
  runtime = Column(String(100), nullable=False)
  user = relationship('User')
  user_id = Column(Integer, ForeignKey('users.id'))