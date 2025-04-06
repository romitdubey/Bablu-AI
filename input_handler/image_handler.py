import cv2
import base64

def capture_image(cap,filename='capture.jpg', camera_index=1):
    ret, frame = cap.read()

    if not ret:
        print("Error: Failed to capture image.")
        return None

    cv2.imwrite(filename, frame)
    return filename

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')
