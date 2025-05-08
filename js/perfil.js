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
  });
  