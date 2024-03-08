function dragOverHandler(event) {
  event.preventDefault();
}

function dragEnterHandler(event) {
  event.preventDefault();
  document.getElementById("drop-area").classList.add("highlight");
}

function dragLeaveHandler(event) {
  event.preventDefault();
  document.getElementById("drop-area").classList.remove("highlight");
}

function dropHandler(event) {
  event.preventDefault();
  document.getElementById("drop-area").classList.remove("highlight");

  const files = event.dataTransfer.files;
  const imagePreview = document.getElementById("image-preview");

  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          imagePreview.innerHTML = "";
          imagePreview.appendChild(img);
        };
      };
      reader.readAsDataURL(file);
    } else {
      alert("El archivo seleccionado no es una imagen.");
    }
  }
}
