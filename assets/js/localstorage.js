document.addEventListener("DOMContentLoaded", () => {
	// Obtener elementos del DOM
	const createForm = document.getElementById("create-form");
	const elementList = document.getElementById("element-list");

	// Obtener elementos del Local Storage
	let elements = JSON.parse(localStorage.getItem("elements")) || [];

	// Mostrar elementos existentes
	showElements();

	// Agregar controlador de eventos para enviar el formulario de creación
	createForm.addEventListener("submit", (e) => {
		e.preventDefault();

		// Obtener valores del formulario
		const nameInput = document.getElementById("name-input");
		const descriptionInput = document.getElementById("description-input");

		const name = nameInput.value;
		const description = descriptionInput.value;

		// Validar valores no vacíos
		if (name.trim() === "" || description.trim() === "") {
			return;
		}

		// Crear un nuevo elemento
		const newElement = {
			id: Date.now(),
			name,
			description,
		};

		// Agregar el nuevo elemento al arreglo
		elements.push(newElement);

		// Guardar elementos en el Local Storage
		localStorage.setItem("elements", JSON.stringify(elements));

		// Limpiar el formulario
		nameInput.value = "";
		descriptionInput.value = "";

		// Mostrar los elementos actualizados
		showElements();
	});

	// Mostrar elementos en la lista
	function showElements() {
		elementList.innerHTML = "";

		elements.forEach((element) => {
			const li = document.createElement("li");
			li.innerHTML = `
		  <div>
			<strong>${element.name}</strong>
			<p>${element.description}</p>
		  </div>
		  <div class="actions">
			<button class="delete-button" data-id="${element.id}">Delete</button>
		  </div>
		`;

			elementList.appendChild(li);
		});
	}

	// Agregar controlador de eventos para borrar un elemento
	elementList.addEventListener("click", (e) => {
		if (e.target.classList.contains("delete-button")) {
			const elementId = parseInt(e.target.dataset.id);

			// Eliminar el elemento correspondiente del arreglo
			elements = elements.filter((element) => element.id !== elementId);

			// Guardar elementos actualizados en el Local Storage
			localStorage.setItem("elements", JSON.stringify(elements));

			// Mostrar los elementos actualizados
			showElements();
		}
	});
});
