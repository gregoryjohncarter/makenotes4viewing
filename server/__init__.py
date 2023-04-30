from flask import Flask, send_from_directory
from server.routes import api
from server.db import init_db
from flask_cors import CORS

app = Flask(__name__, static_folder='../client/build', static_url_path='')
app.url_map.strict_slashes = False
app.config.from_mapping(
  SECRET_KEY='super_secret_key'
)
CORS(app)
app.register_blueprint(api)
@app.route('/', defaults={'path':''})
def serve(path):
  return send_from_directory(app.static_folder,'index.html')
init_db(app)