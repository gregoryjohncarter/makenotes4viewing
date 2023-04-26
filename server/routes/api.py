from server.models import User, Media
from flask import Blueprint, request, jsonify, session
from server.db import get_db
import sys

bp = Blueprint('api', __name__, url_prefix='/api')

# CREATE USER
@bp.route('/users', methods=['POST'])
def signup():
  data = request.get_json()
  db = get_db()

  try:
    newUser = User(
      username = data['username'],
      email = data['email'],
      password = data['password']
    )

    db.add(newUser)
    db.commit()

  except:
    print(sys.exe_info()[0])
    db.rollback()

    return jsonify(message = 'Signup failed'), 500

  session.clear()
  session['user_id'] = newUser.id
  session['loggedIn'] = True

  return jsonify(id = newUser.id)

# LOGOUT USER
@bp.route('/users/logout', methods=['POST'])
def logout():
  session.clear()

  return '', 204

# LOGIN USER
@bp.route('/users/login', methods=['POST'])
def login():
  data = request.get_json()
  db = get_db()

  try:
    user = db.query(User).filter(User.email == data['email']).one()

  except:
    print(sys.exc_info()[0])
    return jsonify(message = 'Incorrect credentials'), 400
  
  if user.verify_password(data['password']) == False:
    return jsonify(message = 'Incorrect credentials'), 400
  
  session.clear()
  session['user_id'] = user.id
  session['loggedIn'] = True

  return jsonify(id = user.id)

# NEW MEDIA
@bp.route('/medias', methods=['POST'])
def create():
  data = request.get_json()
  db = get_db()

  try:
    # create new media item
    newMedia = Media(
      imdbID = data['imdbID'],
      title = data['title'],
      poster = data['poster'],
      year = data['year'],
      contentRating = data['contentRating'],
      genre = data['genre'],
      stars = data['stars'],
      plot = data['plot'],
      director = data['director'],
      runtime = data['runtime'],
      user_id = session.get('user_id')
    )

    db.add(newMedia)
    db.commit()

  except:
    print(sys.exc_info()[0])
    db.rollback()
    return jsonify(message = 'Item failed'), 500

  return jsonify(id = newMedia.id)

# DELETE MEDIA
@bp.route('/medias/<id>', methods=['DELETE'])
def delete(id):
  db = get_db()

  try:
    # delete media from db
    db.delete(db.query(Media).filter(Media.imdbID == id).one())
    db.commit()

  except:
    print(sys.exc_info()[0])
    db.rollback()
    return jsonify(message = 'Media not found'), 404

  return '', 204

@bp.route('/bookmark', methods=['GET'])
def dash():
  db = get_db()

  try:
    medias = (
      db.query(Media)
      .filter(Media.user_id == session.get('user_id'))
      .all()
    )
    
  except:
    print(sys.exc_info()[0])
    db.rollback()
    return jsonify(message = 'Medias not found'), 400
  
  mediasArr = []
  for media in medias:
    mediasArr.append(media.toDict()) 
  return jsonify(mediasArr)