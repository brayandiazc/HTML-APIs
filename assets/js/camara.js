const video = document.getElementById("video-preview");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("capture-btn");
let stream;

// Función para cargar la cámara
async function loadCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error("Error al acceder a la cámara:", err);
  }
}

// Función para capturar la imagen
function captureImage() {
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageDataURL = canvas.toDataURL("image/png");

  // Mostrar la imagen capturada
  const img = new Image();
  img.src = imageDataURL;
  document.body.appendChild(img);

  // Detener el streaming de video
  stopCamera();
}

// Función para detener la cámara
function stopCamera() {
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  }
}

// Cargar la cámara cuando se cargue la página
window.addEventListener("load", loadCamera);

// Detener la cámara al salir de la página
window.addEventListener("unload", stopCamera);
