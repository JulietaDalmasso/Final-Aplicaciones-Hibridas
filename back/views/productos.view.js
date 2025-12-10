import { createPage } from "../pages/utils.js";

export function crearListadoProductos(productos) {
  // Botón principal de agregar proyecto
  let nuevoBtn = `
    <div class="nuevo-proyecto-btn">
      <a href="/productos/nuevo" class="btn-nuevo">+ Nuevo Proyecto</a>
    </div>
  `;

  // Construcción del grid de proyectos
  let html = nuevoBtn;
  html += "<div class='grid'>";
  productos.forEach(producto => {
    html += `
      <article class="card">
        <img src=${producto.img} alt="portfolio">
        <h3>${producto.nombre}</h3>
        <div class="actions">
          <a href="/productos/${producto._id}">Ver</a> |
          <a href="/productos/modificar/${producto._id}">Editar</a> |
          <a href="/productos/eliminar/${producto._id}">Eliminar</a>
        </div>
      </article>
    `;
  });
  html += "</div>";

  return createPage("Proyectos", html);
}

export function crearDetalleProducto(producto) {
  const html = `
    <div class="detail">
      <img src="${producto.img}" alt="imagen del proyecto" class="detail-img" />
      <h1>Nombre del proyecto: ${producto.nombre}</h1>
      <p><strong>Descripción:</strong> ${producto.descripcion}</p>
      <p><strong>Tecnologías utilizadas:</strong> ${producto.tecnologias}</p>
      ${producto.link ? `<p><a href="${producto.link}" target="_blank">Ver proyecto ↗</a></p>` : ""}
      <a href="/productos">Volver</a>
    </div>
  `;
  return createPage("Detalle del Producto", html);
}

// Vista del formulario
export function formularioNuevoProducto() {
  let html = "<form action='/productos/nuevo' method='post'>";
  html += "<input type='text' placeholder='Nombre del Proyecto' name='nombre'/>";
  html += "<input type='text' placeholder='Descripcion del Proyecto' name='descripcion' />";
  html += "<input type='text' placeholder='Tecnologias Usadas' name='tecnologias' />";
  html += "<input type='text' placeholder='URL de la Imagen' name='img' />";  
  html += "<input type='submit' value='Guardar' />";
  html += "</form>";

  return createPage("Nuevo proyecto", html);
}

export function formularioModificarProducto(producto) {
  let html = `<form action='/productos/modificar/${producto._id}' method='post'>`;
  html += `<input type='text' placeholder='Nombre del Proyecto' name='nombre' value="${producto.nombre}"/>`;
  html += `<input type='text' placeholder='Descripcion del Proyecto' name='descripcion' value="${producto.descripcion}"/>`;
  html += `<input type='text' placeholder='Tecnologias Usadas' name='tecnologias' value="${producto.tecnologias}"/>`;
  html += "<input type='submit' value='Editar' />";
  html += "</form>";

  return createPage("Nuevo producto", html);
}

export function formularioEliminar(producto) {
  if (!producto) {
    return createPage("Error", "<p>Producto no encontrado</p>");
  }

  let html = `<div class="delete">`;
  html += `<h1>¿Eliminar este proyecto?</h1>`;
  html += `<div><strong>Nombre:</strong> ${producto.nombre}</div>`;
  html += `<div><strong>Descripción:</strong> ${producto.descripcion}</div>`;
  html += `<div><strong>Tecnologías:</strong> ${producto.tecnologias}</div>`;
  html += `<form action='/productos/eliminar/${producto._id}' method='post'>`;
  html += "<input type='submit' value='Eliminar' />";
  html += "</form>";
  html += `<a href="/productos">Volver</a>`;
  html += `</div>`;

  return createPage("Eliminar", html);
}

// Vista de se eliminó
export function eliminacionExito(id){
  if (id) {
    const html = `
      <h1>Id: ${id}</h1>
      <p>Eliminado correctamente</p>
      <a href="/productos">Volver</a>
    `;
    return createPage("Eliminado", html);
  } else {
    return createPage("Error", "<p>Producto no encontrado</p>");
  }
}

// Creacion de proyect
export function creacionExito(producto) {
  const html = `
    <div class="detail">
      <h1>Proyecto creado con éxito</h1>
      <p><strong>Nombre:</strong> ${producto.nombre}</p>
      <p><strong>Descripción:</strong> ${producto.descripcion}</p>
      <p><strong>Tecnologías:</strong> ${producto.tecnologias}</p>
      <a href="/productos">Volver al listado</a>
    </div>
  `;
  return createPage("Proyecto Creado", html);
}
