# from app.routes import api
from flask import Flask
from server.db import init_db
from flask_cors import CORS
from ariadne import load_schema_from_path, make_executable_schema, graphql_sync, snake_case_fallback_resolvers, ObjectType
from ariadne.constants import PLAYGROUND_HTML
from flask import request, jsonify

type_defs = load_schema_from_path("graphql.typedefs")
schema = make_executable_schema(
  type_defs, snake_case_fallback_resolvers
)

def create_app(test_config=None):
  app = Flask(__name__, static_url_path='/')
  CORS(app)

  # register routes
  # app.register_blueprint(api)

  @app.route("/graphql", methods=["GET"])
  def graphql_playground():
    return PLAYGROUND_HTML, 200
  
  @app.route("/graphql", methods=["POST"])
  def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(
      schema,
      data,
      context_value=request,
      debug=app.debug
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code

  init_db(app)

  return app

# @app.route('/')
# def hello():
#   return 'My First API !!'