document.addEventListener("DOMContentLoaded", () => {
    fetch("conf/configES.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error`);
        }
        return response.json();
      })
      .then(data => {

        // Título del sitio
        const tituloSitio = document.getElementById("titulo-sitio");
        if (tituloSitio && Array.isArray(data.sitio)) {
          tituloSitio.innerHTML = `${data.sitio[0]} <span class="small">${data.sitio[1]}</span> ${data.sitio[2]}`;
        }
  
        // Saludo personalizado
        const saludoUsuario = document.getElementById("saludo-usuario");
        if (saludoUsuario) {
          saludoUsuario.textContent = `${data.saludo}, Daniela Carrero`;
        }
  
        // Placeholder en input
        const inputBuscar = document.getElementById("input-buscar");
        if (inputBuscar) {
          inputBuscar.placeholder = `${data.nombre}...`;
        }
  
        // Texto del botón
        const btnBuscar = document.getElementById("btn-buscar");
        if (btnBuscar) {
          btnBuscar.textContent = data.buscar;
        }
  
        // Footer
        const footerText = document.getElementById("footer-text");
        if (footerText) {
          footerText.textContent = data.copyRight;
        }
      })
      .catch(error => {
        console.error("No se pudo cargar el JSON local:", error);
      });
  });
  