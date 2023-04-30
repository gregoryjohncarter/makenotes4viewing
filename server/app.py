from flask import Flask, render_template
from server.routes import api
from server.db import init_db
from flask_cors import CORS

app = Flask(__name__, static_folder='../client/build/static', template_folder='../client/build', static_url_path='')
app.url_map.strict_slashes = False
app.config.from_mapping(
  SECRET_KEY='super_secret_key'
)
CORS(app)
app.register_blueprint(api)
@app.route('/')
def root():
  return render_template('index.html')
init_db(app)