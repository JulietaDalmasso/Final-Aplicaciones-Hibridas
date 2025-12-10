export function createPage(title, content) {
    let nav = "";
  
    
    if (title === "Proyectos") {
      nav = `
        <nav class="proyectos-links">
            <a href="/">Inicio</a>
            <a href="/productos/seccion/Branding">Branding</a>
            <a href="/productos/seccion/Diseño web">Diseño web</a>
            <a href="/productos/seccion/Videoclips">Videoclips</a>
            <a href="/productos/seccion/Diseño gráfico">Diseño gráfico</a>
            <a href="/productos/seccion/Fotografía">Fotografía</a>
        </nav>
      `;
    } else {
      
      nav = `
        <nav class="proyectos-links">
          <a href="/">Inicio</a>
          <a href="/productos">Proyectos</a>
        </nav>
      `;
    }
  
    let html = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <header class="proyectos-header">
            <h1>${title}</h1>
            ${nav}
          </header>
  
          <main>
            ${content}
          </main>
  
          <footer>
            <p>&copy; Parcial Aplicaciones Hibridas - 2025</p>
          </footer>
        </body>
      </html>
    `;
    return html;
  }
  

export function createProductList(productos) {
    let html = "<table><tr><th>id</th><th>Nombre</th><th>Precio</th></tr>";
    productos.forEach((producto) => {
        html += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>`;
    });
    html += "</table>";
    return html;
}

// module.exports = {createPage, createProductList}
// export {createPage, createProductList}
export default { createPage, createProductList };
