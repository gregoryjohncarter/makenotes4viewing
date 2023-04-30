from flask import Flask, render_template
from server.routes import api
from server.db import init_db
from flask_cors import CORS

app = Flask(__name__, static_folder='../client/build', template_folder='../client/build', static_url_path='')
app.url_map.strict_slashes = False
app.config.from_mapping(
  SECRET_KEY='super_secret_key'
)
CORS(app)
app.register_blueprint(api)
@app.route('/', defaults={'path': ''})
def serve(path):
  return render_template('index.html')
if __name__ == '__main__':
  app.run(host='0.0.0.0')
init_db(app)

