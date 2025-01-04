import requests
from .server import recorder

def main(req, res):
    if requests.post('http://localhost:5173/start-recording'):
        response = requests.post('http://localhost:5173/start-recording')
        result = recorder.start_recording()
        return res.json({
            'message': result,
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
    if requests.post('http://localhost:5173/replay-recording'):
        response = requests.post('http://localhost:5173/replay-recording')
        result = recorder.replay_events()
        return res.json({
            'message': result,
            'status_code': response.status_code,
            'response': response.json()
        })