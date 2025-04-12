import cv2
import mediapipe as mp
import numpy as np

# Initialize MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5)

# Eye landmarks indices
LEFT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
RIGHT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
LEFT_IRIS = [474, 475, 476, 477]
RIGHT_IRIS = [469, 470, 471, 472]

# Gaze detection thresholds
HORIZONTAL_THRESHOLD = 0.025  # How much eye movement is considered "looking away"

def normalize_coords(landmark, image_shape):
    return (int(landmark.x * image_shape[1]), int(landmark.y * image_shape[0]))

def gaze_detection(face_landmarks, image):
    img_h, img_w = image.shape[:2]
    gaze_status = "Looking at Screen"
    
    # Process both eyes
    for eye, iris, side in [(LEFT_EYE, LEFT_IRIS, 'left'), (RIGHT_EYE, RIGHT_IRIS, 'right')]:
        # Get eye boundaries
        eye_points = np.array([(lm.x, lm.y) for lm in [face_landmarks.landmark[i] for i in eye]])
        eye_center = np.mean(eye_points, axis=0)
        
        # Get iris position
        iris_points = np.array([(lm.x, lm.y) for lm in [face_landmarks.landmark[i] for i in iris]])
        iris_center = np.mean(iris_points, axis=0)
        
        # Calculate horizontal displacement
        displacement = iris_center[0] - eye_center[0]
        
        # Determine direction based on eye side
        if side == 'right':
            if displacement > HORIZONTAL_THRESHOLD * (img_w/100):
                gaze_status = "Looking Away"
        else:
            if displacement < -HORIZONTAL_THRESHOLD * (img_w/100):
                gaze_status = "Looking Away"

    return gaze_status

cap = cv2.VideoCapture(1)

while cap.isOpened():
    success, image = cap.read()
    if not success:
        break

    # Process image
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            # Detect gaze direction
            status = gaze_detection(face_landmarks, image)
            
            # Draw eye landmarks
            for idx in LEFT_EYE + RIGHT_EYE:
                lm = face_landmarks.landmark[idx]
                x, y = normalize_coords(lm, image.shape)
                cv2.circle(image, (x, y), 1, (0, 255, 0), -1)
            
            # Display status
            cv2.putText(image, status, (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

    cv2.imshow('Gaze Detection', image)
    if cv2.waitKey(5) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()