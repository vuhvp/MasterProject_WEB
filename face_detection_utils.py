from imutils import face_utils
import numpy as np
import dlib
import cv2
import base64


def crop_black_bg(image):
    y_nonzero, x_nonzero, _ = np.nonzero(image)
    return image[np.min(y_nonzero):np.max(y_nonzero), np.min(x_nonzero):np.max(x_nonzero)]


def convert_2_base64(image_path):
    with open(image_path, "rb") as f:
        data = f.read()
        return base64.b64encode(data)


def face_remap(shape):
    remapped_image = shape.copy()
    # left eye brow
    remapped_image[17] = shape[26]
    remapped_image[18] = shape[25]
    remapped_image[19] = shape[24]
    remapped_image[20] = shape[23]
    remapped_image[21] = shape[22]
    # right eye brow
    remapped_image[22] = shape[21]
    remapped_image[23] = shape[20]
    remapped_image[24] = shape[19]
    remapped_image[25] = shape[18]
    remapped_image[26] = shape[17]
    # neatening
    remapped_image[27] = shape[0]

    remapped_image = cv2.convexHull(shape)
    return remapped_image


def get_face_landmark(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    out_face = np.zeros_like(image)

    # detector = dlib.cnn_face_detection_model_v1(
    #     "resources/mmod_human_face_detector.dat")
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor(
        "resources/shape_predictor_68_face_landmarks.dat")

    # dets = detector(gray, 1)
    rects = detector(gray, 1)
    for (i, rect) in enumerate(rects):
        # faceRect = det.rect
        shape = face_utils.shape_to_np(predictor(gray, rect))

        remapped_shape = np.zeros_like(shape)
        feature_mask = np.zeros((image.shape[0], image.shape[1]))

        remapped_shape = face_remap(shape)
        cv2.fillConvexPoly(feature_mask, remapped_shape[0:27], 1)
        feature_mask = feature_mask.astype(np.bool_)
        out_face[feature_mask] = image[feature_mask]
        # cv2.imshow("mask_inv", out_face)
        # cv2.imwrite("out_face.png", out_face)

        # foreground = crop(out_face)

        # cv2.imwrite("foreground.png", foreground)

    return out_face
