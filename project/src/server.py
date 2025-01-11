from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello_world():
    return "Hello world!"

if __name__ == '__main__':
    app.run(debug=True)
