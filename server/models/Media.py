from server.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, inspect
from sqlalchemy.orm import relationship

class Media(Base):
  __tablename__ = 'medias'
  id = Column(Integer, primary_key=True)
  imdbID = Column(String(300), nullable=False)
  title = Column(String(300), nullable=False)
  user = relationship('User')
  user_id = Column(Integer, ForeignKey('users.id'))
  def toDict(self):
    return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }