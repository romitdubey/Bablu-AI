import cv2
import base64

def capture_image(filename='capture.jpg', camera_index=0):
    cap = cv2.VideoCapture(camera_index)

    while not cap.isOpened() and camera_index < 5:
        print(f"Trying to open camera at index {camera_index}...")
        cap = cv2.VideoCapture(camera_index)
        camera_index += 1
        
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return None

    ret, frame = cap.read()
    cap.release()

    if not ret:
        print("Error: Failed to capture image.")
        return None

    cv2.imwrite(filename, frame)
    return filename

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')
