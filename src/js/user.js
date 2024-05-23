let productos = JSON.parse(localStorage.getItem('productos')) || [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
document.addEventListener('DOMContentLoaded', mostrarProductos);
document.addEventListener('DOMContentLoaded', mostrarCarrito);

// Ejemplo de implementación de la función mostrarProductos
function mostrarProductos() {

    const container = document.getElementById('productContainer');
    //container.innerHTML = ''; // Limpiar cualquier contenido previo

    productos.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-box';
        productDiv.innerHTML = `
                <h2>${producto.name}</h2>
                <h4>${producto.description}</h4>
                <h4>${producto.price}</h4>
                <h4>${producto.quantity}</h4>
                <img src="${producto.image}" alt="${producto.name}">
                <input id = "quantity-${producto.name}" type="number" min="1" max="${producto.quantity}">
                <button onclick="agregarCarrito('${producto.name}')">Añadir a la cesta</button>
            `;
        container.appendChild(productDiv);
    });
}

function mostrarCarrito() {
    const div = document.getElementById('shoppingCart');
    //div.innerHTML = '';

    carrito.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'div-' + producto.name;
        productDiv.innerHTML = `
            <a>${producto.name}</a>
            <a>${producto.price}</a>
            <a>${producto.quantityAdded}</a>
            <img src="${producto.image}" alt="${producto.name}"></img>
            <button onclick="eliminarProductoCarrito('${producto.name}')">Eliminar</button>
            <button onclick="window.location.href = 'payment.html?name=${encodeURIComponent(producto.name)}';">Comprar</button>
        `;
        div.appendChild(productDiv);
    });
}

function agregarCarrito(name) {
    const product = productos.find(producto => producto.name === name);
    const quantity = document.getElementById("quantity-" + name).value;
    const nuevoProducto = {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        image: product.image,
        quantityAdded: quantity
    };
    carrito.push(nuevoProducto);
    console.log(nuevoProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("Se añadio al carrito correctamente!");
    mostrarCarrito();
}

function eliminarProductoCarrito(name) {
    // Eliminar producto del array
    carrito = carrito.filter(producto => producto.name !== name);

    // Actualizar el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar el DOM
    mostrarCarrito();
}

function comprar(){
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const order = carrito.find(producto => producto.name === name);
    const product = productos.find(producto => producto.name === name);
    if(order.quantityAdded > product.quantity){
        alert("No hay existencias suficientes!");
        return;
    } 
    const index = productos.findIndex(producto => producto.name === name);
    
    if (index === -1) {
        console.error(`El producto "${name}" ha sido retirado de stock.`);
        return;
    }
    productos[index].quantity = product.quantity - order.quantityAdded;

    localStorage.setItem('productos', JSON.stringify(productos));

    eliminarProductoCarrito(name);
    window.location.href = 'user.html';
}