import requests


def main(req, res):
    response = requests.post('http://localhost:5173/start-recording')
    
    return res.json({
        'message': 'Recording started',
        'status_code': response.status_code,
        'response': response.json()
    })