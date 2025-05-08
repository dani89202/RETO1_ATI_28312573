document.addEventListener("DOMContentLoaded", () => {
    // Cargar configuración del sitio (sin cambios relevantes para la búsqueda)
    fetch("conf/configES.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al cargar la configuración`);
        }
        return response.json();
      })
      .then(data => {
        const tituloSitio = document.getElementById("titulo-sitio");
        if (tituloSitio && Array.isArray(data.sitio)) {
          tituloSitio.innerHTML = `${data.sitio[0]} <span class="small">${data.sitio[1]}</span> ${data.sitio[2]}`;
        }
        const saludoUsuario = document.getElementById("saludo-usuario");
        if (saludoUsuario) {
          saludoUsuario.textContent = `${data.saludo}, Daniela Carrero`;
        }
        const inputBuscar = document.getElementById("input-buscar");
        if (inputBuscar) {
          inputBuscar.placeholder = `${data.nombre}...`;
        }
        const btnBuscar = document.getElementById("btn-buscar");
        if (btnBuscar) {
          btnBuscar.textContent = data.buscar;
          // Agregar el evento de escucha para la búsqueda al botón
          btnBuscar.addEventListener("click", realizarBusqueda);
        }
        const footerText = document.getElementById("footer-text");
        if (footerText) {
          footerText.textContent = data.copyRight;
        }
      })
      .catch(error => {
        console.error("No se pudo cargar el JSON de configuración:", error);
      });
  
    // Ahora hacemos la carga de los estudiantes segun la busqueda
    let estudiantesData = []; // Variable para almacenar la lista completa de estudiantes
    const listaEstudiantesElement = document.getElementById("lista-estudiantes");
  
    function mostrarEstudiantes(estudiantes) {

      listaEstudiantesElement.innerHTML = ""; // Limpiamos la lista actual

      if (estudiantes.length === 0) {
        const mensajeNoEncontrado = document.createElement("p");
        const inputBuscar = document.getElementById("input-buscar");
        const query = inputBuscar ? inputBuscar.value : "";
        mensajeNoEncontrado.textContent = `No hay alumnos que tengan en su nombre: ${query}`;
        mensajeNoEncontrado.style.textAlign = "center";
        mensajeNoEncontrado.style.color = "#6812f3";
        mensajeNoEncontrado.style.gridColumn = "1 / -1";

        listaEstudiantesElement.appendChild(mensajeNoEncontrado);

      } 
      else {
        estudiantes.forEach(est => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = `perfil.html?ci=${est.ci}`;
          const img = document.createElement("img");
          img.src = `${est.imagen}`;
          img.alt = `Foto de ${est.nombre}`;
          const span = document.createElement("span");
          span.textContent = est.nombre;
  
          link.appendChild(img);
          li.appendChild(link);
          li.appendChild(span);
          listaEstudiantesElement.appendChild(li);
        });
      }
    }
  
    fetch("datos/index.json")
      .then(response => {
        if (!response.ok) throw new Error("Error cargando estudiantes.json");
        return response.json();
      })
      .then(estudiantes => {
        estudiantesData = estudiantes; // Guardar la lista completa
        mostrarEstudiantes(estudiantesData); // Mostrar la lista inicial
      })
      .catch(error => {
        console.error("Error al cargar estudiantes:", error);
      });
  
    // Función para la bsuqeuda de los estudiantes
    function realizarBusqueda(event) {
      event.preventDefault(); // Evita la recarga de la pagina
      const inputBuscar = document.getElementById("input-buscar");
      const query = inputBuscar.value.toLowerCase().trim();
  
      const resultados = estudiantesData.filter(est =>
        est.nombre.toLowerCase().includes(query)
      );
  
      mostrarEstudiantes(resultados);
    }

  });