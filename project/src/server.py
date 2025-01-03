from flask import Flask, jsonify
from .test import PreciseActionRecorder
import requests


app = Flask(__name__)
recorder = PreciseActionRecorder()

@app.route('/start-recording', methods=['POST'])
def start_recording():
    recorder.start_recording()
    return jsonify({"message": "Recording started"}), 200

@app.route('/stop-recording', methods=['POST'])
def start_recording():
    recorder.stop_recording()
    return jsonify({"message": "Recording stoped"}), 200

@app.route('/replay-recording', methods=['POST'])
def start_recording():
    recorder.replay_events()
    return jsonify({"message": "Recording replaying"}), 200

def main(req, res):
    response = requests.post('http://localhost:5173/start-recording')
    return res.json({
        'message': 'Recording started',
        'status_code': response.status_code,
        'response': response.json()
    })

if __name__ == '__main__':
    app.run(port=5173)