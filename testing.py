import threading
import cv2

cap = cv2.VideoCapture(1)

def show_camera(cap):
    cv2.namedWindow("Camera", cv2.WINDOW_NORMAL)
    cv2.resizeWindow("Camera", 640, 480)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            continue
        cv2.imshow("Camera", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break  
threading.Thread(target=show_camera, args=(cap,)).start()