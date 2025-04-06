import os

# Define the folder and file structure
structure = [
    "main.py",
    "requirements.txt",
    "multimodal_coordinator.py",
    "groq_api.py",
    "response_handler.py",
    {
        "input_handler": [
            "audio_listener.py",
            "image_handler.py",
            "text_input.py"
        ]
    },
    {
        "frontend": [
            "app.py",
            {
                "templates": [
                    "index.html"
                ]
            },
            {
                "static": [
                    {
                        "css": ["style.css"]
                    },
                    {
                        "js": ["script.js"]
                    }
                ]
            }
        ]
    },
    {
        "utils": [
            "helpers.py"
        ]
    }
]

def create_structure(base_path, structure):
    for item in structure:
        if isinstance(item, str):
            file_path = os.path.join(base_path, item)
            with open(file_path, 'w') as f:
                f.write("")  # create empty file
            print(f"Created file: {file_path}")
        elif isinstance(item, dict):
            for folder, contents in item.items():
                folder_path = os.path.join(base_path, folder)
                os.makedirs(folder_path, exist_ok=True)
                print(f"Created folder: {folder_path}")
                create_structure(folder_path, contents)

# Run the script in the current working directory
current_dir = os.getcwd()
create_structure(current_dir, structure)
