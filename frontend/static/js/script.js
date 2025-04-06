function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value;
    if (!message) return;
  
    appendToChat("You", message);
    inputField.value = "";
  
    fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        appendToChat("Jarvis", data.reply);
      });
  }
  
  function appendToChat(sender, message) {
    const chatLog = document.getElementById("chat-log");
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  
  function toggleCamera() {
    const video = document.getElementById("camera");
    if (video.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    } else {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => video.srcObject = stream)
        .catch(err => console.error("Camera error:", err));
    }
  }
  
  function startMic() {
    alert("🎤 Microphone input feature will be added here!");
  }
  