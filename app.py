from flask import Flask, render_template
from flask_socketio import SocketIO, emit
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


# @app.route('/upload', methods=['GET', 'POST'])
# def upload():
#     if request.method == 'POST':
#         file = request.files['file']
#         # f.save(secure_filename(f.filename))
#         image = read_image(file)
#         detect_face(image)
#         return 'file uploaded successfully!'


@socketio.on('connect')
def on_connection():
    print("Client connected")


@socketio.on('disconnect')
def on_connection():
    print("Client disconnected")


@socketio.on('imageUri')
def on_receive_image_uri(uri):
    with open("imageToSave.png", "wb") as file:
        file.write(base64.decodebytes(uri.encode("utf-8")))
        image = cv2.imread('imageToSave.png')
        face_landmark = get_face_landmark(image)
        face = crop_black_bg(face_landmark)
        final = remove(face)
        cv2.imwrite('face.png', final)
        b64_string = convert_2_base64('face.png')
        emit('imageUri', b64_string.decode("utf-8"), broadcast=True)


if __name__ == "__main__":
    app.debug = True
    socketio.run(app, host='0.0.0.0', port=3000)
