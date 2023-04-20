from ..models import User, Media

def signup_resolver(obj, info):
  try:

def login_resolver(obj, info, userN):
  try:
    user = [User.query.get(username==userN)]

def user_me_resolver(obj, info):
  try: 
        
def media_create_resolver(obj, info):
  try:
        
def media_remove_resolver(obj, info):
  try: