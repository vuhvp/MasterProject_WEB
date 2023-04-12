from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)


@app.route('/')
def index():
    return render_template("home.html")


@socketio.on('connect')
def on_connection():
    print("Client connected")


@socketio.on('imageUri')
def on_receive_image_uri(uri):
    print(uri)
    emit('imageUri', uri, broadcast=True)


if __name__ == "__main__":
    app.debug = True
    socketio.run(app, host='0.0.0.0', port=3000)
