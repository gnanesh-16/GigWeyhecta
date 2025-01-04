import requests
from .server import recorder

def main(req, res):
    response = requests.post('http://localhost:5173/start-recording')
    result = recorder.start_recording()
    return res.json({
        'message': result,
        'status_code': response.status_code,
        'response': response.json()
    })