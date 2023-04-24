from server.routes import api
from flask import Flask
from server.db import init_db
from flask_cors import CORS

def create_app(test_config=None):
  app = Flask(__name__, static_url_path='/')
  app.url_map.strict_slashes = False
  app.config.from_mapping(
    SECRET_KEY='super_secret_key'
  )
  CORS(app)
  app.register_blueprint(api)
  init_db(app)

  return app