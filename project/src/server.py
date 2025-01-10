from flask import Flask, jsonify
import requests
from .test import PreciseActionRecorder
import json

app = Flask(__name__)
recorder = PreciseActionRecorder()

@app.route('/start-recording', methods=['POST'])
def start_recording(context):
    recorder.start_recording()
    if(recorder.is_recording):
        context.log("Recording started")
        return jsonify({"message": "Recording started"}), 200
    # return jsonify({"message": "Recording started"}), 200

@app.route('/stop-recording', methods=['POST'])
def start_recording(context):
    log_file = recorder.stop_recording()
    if log_file:
        with open(log_file, 'r') as f:
            data = f.read()
        # Send the JSON data to the database
        response = requests.post('https://cloud.appwrite.io/v1/databases/678134b3002fc036acbe/collections/678134bf0030cbc83f3a/documents', 
                                 headers={'Content-Type': 'application/json'},
                                 data=data)
        return jsonify({"message": "Recording stopped", "response": response.json()}), 200
    else:
        return jsonify({"message": "No events recorded"}), 400


@app.route('/replay-recording', methods=['POST'])
def start_recording():
    recorder.replay_events()
    return jsonify({"message": "Recording replaying"}), 200



if __name__ == '__main__':
    app.run(port=5173)