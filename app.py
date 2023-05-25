from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room
import base64
import cv2
from rembg import remove
from face_detection_utils import get_face_landmark, crop_black_bg, convert_2_base64

app = Flask(__name__)
socketio = SocketIO(app, max_http_buffer_size=1e8)
face_cascade = cv2.CascadeClassifier(
    'resources/haarcascade_frontalface_default.xml')


@app.route('/')
def index():
    return render_template("home.html")


@socketio.on('connect')
def on_connection():
    print("Client connected")


@socketio.on('disconnect')
def on_connection():
    print("Client disconnected")


@socketio.on('join')
def on_join(room):
    join_room(room)
    print(room, 'room')


@socketio.on('leave')
def on_leave(room):
    leave_room(room)


@socketio.on('imageUriFromApp')
def on_receive_image_uri(data):
    print(data['room'], 'data')
    with open("imageToSave.png", "wb") as file:
        file.write(base64.decodebytes(data['uri'].encode("utf-8")))
        image = cv2.imread('imageToSave.png')
        face_landmark = get_face_landmark(image)
        face = crop_black_bg(face_landmark)
        final = remove(face)
        cv2.imwrite('face.png', final)
        b64_string = convert_2_base64('face.png')
        emit('imageUri', b64_string.decode("utf-8"), room=data['room'])


if __name__ == "__main__":
    app.debug = True
    socketio.run(app, host='0.0.0.0', port=3000)
