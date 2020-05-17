from flask import Flask, flash, request, redirect, url_for, jsonify, Response
from werkzeug.utils import secure_filename
import os
from google.cloud import storage
from oauth2client.service_account import ServiceAccountCredentials
import zipfile
from data_clean import cleanup
import time

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="credentials.json"
client = storage.Client()
bucket = client.get_bucket('ryerson-hacks-2020-aiplatform')

app = Flask(__name__)
old_time = time.time()

@app.route('/', methods=['POST'])
def upload_file():
    print("HERE")
    name = request.form.get("name")
    cleanup("data/messages")
    
    
    blob = bucket.blob('582C63D4AD74EA354E4F84EC2B4BADDB.txt')
    blob.upload_from_filename('fbMessages.txt')

    return Response("{'message': 'file uploaded successfully!'}", status=200, mimetype='application/json')


@app.route('/check_done', methods=['GET'])
def check_done():

    if time.time() - old_time > 5:
        return Response("{'done': True}", status=200, mimetype='application/json')
    else:
        return Response("{'done': False}", status=200, mimetype='application/json')

    # check if the post request has the file part
    # if 'file' not in request.files:
    #     flash('No file part')
    #     return Response("{'err':'File not found'}", status=400, mimetype='application/json')
    
    # with open("zip_data/thing.zip", "bw") as f:
    #     chunk_size = 4096
    #     while True:
    #         chunk = request.stream.read(chunk_size)
    #         if len(chunk) == 0:
    #             break
    #         f.write(chunk)
    
    # with zipfile.ZipFile("zip_data/thing.zip", 'r') as zip_ref:
    #     zip_ref.extractall("zip_data")
    

    # print("HERE3")
    # file = request.files['file']
    # print("BRUH")
    # if file and allowed_file(file.filename):
    #     print("HERE2")
    #     filename = secure_filename(file.filename)

    #     print(filename)
    #     print(name)
    #     file.save(os.path.join("zip_data", filename))
    #     # clean_file(app.config['UPLOAD_FOLDER'], filename))

    

# def upload_file_to_gcp(path):

# credentials = ServiceAccountCredentials.from_json_keyfile_name('credentials.json')
# client = storage.Client()
# bucket = client.get_bucket('ryerson-hacks-2020-aiplatform')
# blob = bucket.blob(file_name)
# blob.upload_from_filename(file_name)


    # check if the post request has the file part
    # if 'file' not in request.files:
    #     flash('No file part')
    #     return Response("{'err':'File not found'}", status=400, mimetype='application/json')
    
    # with open("zip_data/thing.zip", "bw") as f:
    #     chunk_size = 4096
    #     while True:
    #         chunk = request.stream.read(chunk_size)
    #         if len(chunk) == 0:
    #             break
    #         f.write(chunk)
    
    # with zipfile.ZipFile("zip_data/thing.zip", 'r') as zip_ref:
    #     zip_ref.extractall("zip_data")
    

    # print("HERE3")
    # file = request.files['file']
    # print("BRUH")
    # if file and allowed_file(file.filename):
    #     print("HERE2")
    #     filename = secure_filename(file.filename)

    #     print(filename)
    #     print(name)
    #     file.save(os.path.join("zip_data", filename))
    #     # clean_file(app.config['UPLOAD_FOLDER'], filename))