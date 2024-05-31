let productos = JSON.parse(localStorage.getItem('productos')) || [];
document.addEventListener('DOMContentLoaded', mostrarProductos);

// Ejemplo de implementación de la función mostrarProductos
function mostrarProductos() {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    productos.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4 mb-4';
        productDiv.innerHTML = `
            <div class="card">
                <img src="${producto.image}" alt="${producto.name}" class="card-img-top" style="width: 200px; height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${producto.name}</h5>
                    <p class="card-text">${producto.description}</p>
                    <p class="card-text">Precio: $${producto.price}</p>
                    <p class="card-text">Cantidad: ${producto.quantity}</p>
                    <button onclick="redirigirModificar('${producto.name}')" class="btn btn-primary mb-2">Modificar producto</button>
                    <button onclick="eliminarProducto('${producto.name}')" class="btn btn-danger">Eliminar producto</button>
                </div>
            </div>
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
    const  cantidad= document.getElementById("quantity").value;
    const descripcion = document.getElementById("productDescription").value.trim();
    const foto = document.getElementById("productImageLink").value;
    const errorprecio = document.getElementById("error-price");
    const errorcantidad = document.getElementById("error-quantity");

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
                quantity: cantidad,
                description: descripcion,
                image: foto
            };
            productos.push(nuevoProducto);
            localStorage.setItem('productos', JSON.stringify(productos));
            alert("Formulario enviado correctamente!");
        }
    window.location.href = 'admin.html';
}



// Ejemplo de implementación de las funciones modificarProducto y eliminarProducto
function eliminarProducto(name) {
    var confirmacion = confirm('Esta seguro de querer eliminar el producto '+name+ '?');
    if(confirmacion){
        console.log(`Eliminar producto con nombre: ${name}`);

        // Eliminar producto del array
        productos = productos.filter(producto => producto.name !== name);

        // Actualizar el localStorage
        localStorage.setItem('productos', JSON.stringify(productos));

        // Actualizar el DOM
        mostrarProductos();
    }
}