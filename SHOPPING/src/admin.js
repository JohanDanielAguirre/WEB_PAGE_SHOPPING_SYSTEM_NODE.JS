let productos = JSON.parse(localStorage.getItem('productos')) || [];
document.addEventListener('DOMContentLoaded', mostrarProductos);

// Ejemplo de implementación de la función mostrarProductos
function mostrarProductos() {

    const container = document.getElementById('productContainer');
    container.innerHTML = ''; // Limpiar cualquier contenido previo

    productos.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-box';
        productDiv.innerHTML = `
                <h2>${producto.name}</h2>
                <h4>${producto.description}</h4>
                <h4>${producto.price}</h4>
                <h4>${producto.cuantity}</h4>
                <img src="${producto.image}" alt="${producto.name}">
                <button onclick="redirigirModificar('${producto.name}')">Modificar producto</button>
                <button onclick="eliminarProducto('${producto.name}')">Eliminar producto</button>
            `;
        container.appendChild(productDiv);
    });
}

function redirigirModificar(name) {
    // Redirigir a la página de modificación con el nombre del producto como parámetro en la URL
    window.location.href = `modifyproduct.html?name=${encodeURIComponent(name)}`;
}
function validarFormulario() {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    const nombre = document.getElementById("productName").value.trim();
    const precio = document.getElementById("productPrice").value;
    const  cantidad= document.getElementById("cuantity").value;
    const descripcion = document.getElementById("productDescription").value.trim();
    const foto = document.getElementById("productImageLink").value;
    const errorprecio = document.getElementById("error-price");
    const errorcantidad = document.getElementById("error-cuantity");

    if (precio <= 0) {
        errorprecio.innerHTML = "Los productos deben de tener un precio mayor a 0";
    } else if (productos.some(producto => producto.name === nombre)) {
        alert("ya existe el producto");
    }else if(cantidad <= 0){
        errorcantidad.innerHTML = "Los productos deben de tener una cantidad mayor a 0";
    } else{
            const nuevoProducto = {
                name: nombre,
                price: precio,
                cuantity: cantidad,
                description: descripcion,
                image: foto
            };
            productos.push(nuevoProducto);
            localStorage.setItem('productos', JSON.stringify(productos));
            alert("Formulario enviado correctamente!");
        }
    window.location.href = 'admin.html';
}

function modificarProducto(name) {

}

// Ejemplo de implementación de las funciones modificarProducto y eliminarProducto
function eliminarProducto(name) {
    console.log(`Eliminar producto con nombre: ${name}`);

    // Eliminar producto del array
    productos = productos.filter(producto => producto.name !== name);

    // Actualizar el localStorage
    localStorage.setItem('productos', JSON.stringify(productos));

    // Actualizar el DOM
    mostrarProductos();
}