import cv2

assistant_name = "bablu"

def initialize_camera():
    camera_index = 1
    cap = cv2.VideoCapture(camera_index)
    while not cap.isOpened() and camera_index < 5:
        print(f"Trying to open camera at index {camera_index}...")
        camera_index += 1
        cap = cv2.VideoCapture(camera_index)
    return cap

def show_camera(activate, cap):
    cv2.namedWindow(f"{assistant_name} Cam", cv2.WINDOW_NORMAL)
    cv2.resizeWindow(f"{assistant_name} Cam", 640, 480)
    while activate and cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            continue
        cv2.imshow(f"{assistant_name} Cam", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
