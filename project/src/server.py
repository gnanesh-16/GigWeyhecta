from flask import Flask, request, jsonify
import importlib
import asyncio

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello_world():
    return "Hello world!"

async def execute(context):
    # ...existing code...
    userPath = "projectsrcserver"  # Ensure this is the correct module path
    userModule = importlib.import_module("function." + userPath)
    # ...existing code...

async def action():
    # ...existing code...
    output = await asyncio.wait_for(execute(context), timeout=safeTimeout)
    # ...existing code...

if __name__ == '__main__':
    app.run(debug=True)
