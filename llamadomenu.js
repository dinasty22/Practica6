
    // Carga el JSON y genera el menu
    fetch("menu.json")
      .then(res => res.json())
      .then(datos => {
        const menu = document.getElementById("menu");
        const lista = document.createElement("ul");

        datos.forEach(item => {
          const li = document.createElement("li");
          const enlace = document.createElement("a");
          enlace.textContent = item.nombre;
          enlace.href = item.enlace;
          li.appendChild(enlace);

          if (item.submenu && item.submenu.length > 0) {
            const subLista = document.createElement("ul");
            item.submenu.forEach(sub => {
              const subLi = document.createElement("li");
              const subEnlace = document.createElement("a");
              subEnlace.textContent = sub.nombre;
              subEnlace.href = sub.enlace;
              subLi.appendChild(subEnlace);
              subLista.appendChild(subLi);
            });
            li.appendChild(subLista);
          }

          lista.appendChild(li);
        });

        menu.appendChild(lista);
      })
      .catch(error => console.log("Error cargando el menu:", error));



      
// === FORMULARIO PARA ADMINISTRAR EL MENÚ ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formMenu");
  const listaOpciones = document.getElementById("listaOpciones");

  // Mostrar opciones guardadas
  const mostrarOpciones = () => {
    if (!listaOpciones) return;
    listaOpciones.innerHTML = "";
    const guardados = JSON.parse(localStorage.getItem("menuExtra")) || [];
    guardados.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} → ${item.enlace}`;
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.style.marginLeft = "10px";
      btnEliminar.onclick = () => eliminarOpcion(index);
      li.appendChild(btnEliminar);
      listaOpciones.appendChild(li);
    });
  };

  const eliminarOpcion = (index) => {
    const guardados = JSON.parse(localStorage.getItem("menuExtra")) || [];
    guardados.splice(index, 1);
    localStorage.setItem("menuExtra", JSON.stringify(guardados));
    mostrarOpciones();
    alert("Opción eliminada del menú ❌");
    location.reload(); // actualizar visualmente el menú
  };

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value.trim();
      const enlace = document.getElementById("enlace").value.trim();

      if (nombre && enlace) {
        const menu = document.querySelector("#menu ul");
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = nombre;
        a.href = enlace;

        li.appendChild(a);
        menu.appendChild(li);

        // Guardar en localStorage
        const nuevoItem = { nombre, enlace };
        const guardados = JSON.parse(localStorage.getItem("menuExtra")) || [];
        guardados.push(nuevoItem);
        localStorage.setItem("menuExtra", JSON.stringify(guardados));

        form.reset();
        alert("✅ Opción agregada correctamente al menú");
        mostrarOpciones();
      }
    });

    mostrarOpciones();
  }
});
