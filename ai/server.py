from flask import Flask, flash, request, redirect, url_for, jsonify, Response
from werkzeug.utils import secure_filename
import os
# import JSON

UPLOAD_FOLDER = ''
ALLOWED_EXTENSIONS = {'zip'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':

        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return Response("{'err':'File not found'}", status=400, mimetype='application/json')
        
        file = request.files['file']

        if file and allowed_file(file.filename):
            print("HERE")
            filename = secure_filename(file.filename)
            print(filename)
            print(request.form.get("name"))
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            return Response("{'message': 'file uploaded successfully!'}", status=200, mimetype='application/json')
    else:
        return jsonify(
            username="HI"
        )