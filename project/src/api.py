import requests
from .test import PreciseActionRecorder

recorder = PreciseActionRecorder()

def main(req, res):
    if requests.post('http://localhost:5173/start-recording'):
        response = requests.post('http://localhost:5173/start-recording')
        recorder.start_recording()
        return res.json({
            'message': 'Recording started' ,
            'status_code': response.status_code,
            'response': response.json()
        })
    if requests.post('http://localhost:5173/stop-recording'):
        response = requests.post('http://localhost:5173/stop-recording')
        result = recorder.stop_recording()
        return res.json({
            'message': result,
            'status_code': response.status_code,
            'response': response.json()
        })
    if requests.get('http://localhost:5173/replay-recording'):
        response = requests.get('http://localhost:5173/replay-recording')
        recorder.replay_events()
        return res.json({
            'message': result,
            'status_code': response.status_code,
            'response': response.json()
        })