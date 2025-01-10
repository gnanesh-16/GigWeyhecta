from flask import Flask, jsonify
import requests
from .test import PreciseActionRecorder


app = Flask(__name__)
recorder = PreciseActionRecorder()

@app.route('/start-recording', methods=['POST'])
def start_recording():
    recorder.start_recording()
    return jsonify({"message": "Recording started"}), 200

@app.route('/stop-recording', methods=['POST'])
def start_recording():
    log_file = recorder.stop_recording()
    if log_file:
        with open(log_file, 'r') as f:
            data = f.read()
        # Send the JSON data to the database
        response = requests.post('https://cloud.appwrite.io/v1/databases/DBLD/collections/67751f2a00039872c0e0/documents', 
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