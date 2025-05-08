document.addEventListener("DOMContentLoaded", () => {
    fetch("conf/configES.json")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar JSON");
        return response.json();
      })
      .then(data => {
        // Asignar los textos de las etiquetas usando las clases existentes
        const labelColor = document.querySelector(".info-label.color");
        const labelLibro = document.querySelector(".info-label.libro");
        const labelMusica = document.querySelector(".info-label.musica");
        const labelJuegos = document.querySelector(".info-label.juegos");
        const labelLenguajes = document.querySelector(".info-label.lenguajes b");
  
        if (labelColor) labelColor.textContent = data.color || "";
        if (labelLibro) labelLibro.textContent = data.libro || "";
        if (labelMusica) labelMusica.textContent = data.musica || "";
        if (labelJuegos) labelJuegos.textContent = data.video_juego || "";
        if (labelLenguajes) labelLenguajes.textContent = data.lenguajes || "";
      })
      .catch(error => {
        console.error("Error al procesar perfil:", error);
      });

      // Cargamos un perfil de forma dinamica 
      // Obtenemos el ci desde la URL
        const params = new URLSearchParams(window.location.search);
        const ci = params.get("ci"); // Obtener el valor de 'ci'

        if (ci) {
            // Cargamos los datos del perfil desde el archivo correspondiente
            fetch(`${ci}/perfil.json`)
                .then(response => {
                    if (!response.ok) throw new Error("Error al cargar el perfil del estudiante");
                    return response.json();
                })
                .then(data => {
                    // Mostrar los datos en la página de perfil
                    document.getElementById("estudiante").textContent = data.nombre;
                    document.querySelector(".nombre").textContent = data.nombre;
                    document.querySelector(".descripcion").textContent = data.descripcion;
                    document.querySelector(".respuesta-color").textContent = data.color;
                    document.querySelector(".respuesta-libro").textContent = data.libro;
                    document.querySelector(".respuesta-musica").textContent = data.musica;

                    // Mostrar los juegos favoritos
                    document.querySelector(".respuesta-juegos").textContent = data.video_juego.join(", ");

                    // Mostrar los lenguajes aprendidos
                    document.querySelector(".respuesta-lenguajes").textContent = data.lenguajes.join(", ");

                    // Mostrar el correo electrónico
                    const correoLink = document.querySelector(".respuesta-correo");
                    correoLink.href = `mailto:${data.email}`;
                    correoLink.textContent = data.email;

                    // Mostrar la foto del perfil
                    const imagenElement = document.querySelector(".foto img");
                    const urlJPG = `${ci}/${data.ci}.jpg`;
                    const urlPNG = `${ci}/${data.ci}.png`;

                    imagenElement.onerror = () => {
                      imagenElement.onerror = null; // Evita un bucle infinito si .png también falla
                      imagenElement.src = urlPNG;
                    };

                    imagenElement.src = urlJPG;
                    imagenElement.alt = data.nombre
                    
                })
                .catch(error => {
                    console.error("Error al cargar el perfil:", error);
                });
    } else {
        console.error("No se encontró el parámetro 'ci' en la URL");
    }

  });
  