from server.db import Base
from .User import User
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class Media(Base):
  __tablename__ = 'Medias'
  id = Column(Integer, primary_key=True)
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