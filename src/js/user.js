let productos = JSON.parse(localStorage.getItem('productos')) || [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let historial = JSON.parse(localStorage.getItem('historial')) || [];
document.addEventListener('DOMContentLoaded', mostrarProductos);
document.addEventListener('DOMContentLoaded', mostrarCarrito);
document.addEventListener('DOMContentLoaded', mostrarHistorial);

function mostrarProductos() {
    const container = document.getElementById('productContainer');
    container.className = 'row'; 

    productos.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-box card mb-4 col-md-4'; 
        productDiv.style.marginRight = '10px';
        productDiv.style.marginLeft = '10px';
        productDiv.style.marginBottom = '10px';
        productDiv.innerHTML = `
            <div class="card-body">
                <h2 class="card-title">${producto.name}</h2>
                <p class="card-text">${producto.description}</p>
                <p class="card-text">$${producto.price}</p>
                <p class="card-text">Disponible: ${producto.quantity}</p>
                <img class="card-img-top" src="${producto.image}" alt="${producto.name}" style="width: 100px; height: 100px;">
                <input id = "quantity-${producto.name}" type="number" min="1" max="${producto.quantity}" class="form-control mt-2">
                <button onclick="agregarCarrito('${producto.name}')" class="btn btn-primary mt-2">Añadir a la cesta</button>
            </div>
        `;
        container.appendChild(productDiv);
    });
}

function mostrarCarrito() {
    const div = document.getElementById('shoppingCart');
    div.innerHTML = '';
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    carrito.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'div-' + producto.name + ' card mb-4 col-md-4';
        productDiv.style.maxWidth = '200px'; // Establece un ancho máximo
        productDiv.style.maxHeight = '400px'; // Establece una altura máxima
        productDiv.style.marginRight = '10px';
        productDiv.style.marginLeft = '10px';
        productDiv.style.marginBottom = '10px';
        productDiv.innerHTML = `
        <div class="card-body">
            <h4>${producto.name}</h4>
            <p>$${producto.price}</p>
            <p>Cantidad: ${producto.quantityAdded}</p>
            <img src="${producto.image}" alt="${producto.name}" style="width: 100px; height: 100px;">
            <button onclick="eliminarProductoCarrito('${producto.name}', '${producto.quantityAdded}')" class="btn btn-danger mt-2">Eliminar</button>
            <button onclick="window.location.href = 'payment.html?name=${encodeURIComponent(producto.name)}';" class="btn btn-success mt-2">Comprar</button>
        </div>
    `;
        rowDiv.appendChild(productDiv);
    });


    div.appendChild(rowDiv);
    if (!estaVacio(carrito)) {
        const allButton = document.createElement('button');
        allButton.className = 'totalPayment btn btn-primary mt-2';
        allButton.textContent = 'Pagar todo';
        allButton.onclick = function () {
            window.location.href = `payment.html?name=${encodeURIComponent('all')}`;
        };
        div.appendChild(allButton);
    }
}

function mostrarHistorial(){
    const container = document.getElementById('historyContainer');
    container.className = 'row'; // Añade la clase 'row' al contenedor

    historial.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-box card mb-4 col-md-4'; // Añade la clase 'col-md-4' para crear una grilla de 3 columnas
        productDiv.style.marginRight = '10px';
        productDiv.style.marginLeft = '10px';
        productDiv.style.marginBottom = '10px';
        productDiv.innerHTML = `
            <div class="card-body">
                <h2 class="card-title">${producto.name}</h2>
                <p class="card-text">$${producto.price}</p>
                <p class="card-text">${producto.dateSold}</p>
                <p class="card-text">Catidad Comprada: ${producto.quantitySold}</p>
                <img class="card-img-top" src="${producto.image}" alt="${producto.name}" style="width: 100px; height: 100px;">
            </div>
        `;
        container.appendChild(productDiv);
    });
}

function agregarCarrito(name) {
    const product = productos.find(producto => producto.name === name);
    const quantity = parseInt(document.getElementById("quantity-" + name).value);
    if(isNaN(quantity)){
        alert("Seleccione una cantidad valida!")
        return;
    }
    const nuevoProducto = {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        image: product.image,
        quantityAdded: quantity
    };
    carrito.push(nuevoProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("Se añadio al carrito correctamente!");
    mostrarCarrito();
}

function agregarHistorial(name, quantity) {
    const product = carrito.find(producto => (producto.quantityAdded == quantity && producto.name == name));
    console.log(product);
    const currentDate = new Date();
    const historyElement = {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        image: product.image,
        quantitySold: product.quantityAdded,
        dateSold: currentDate.toDateString()
    };
    historial.push(historyElement);
    localStorage.setItem('historial', JSON.stringify(historial));
}

function eliminarProductoCarrito(name, quantity) {
    console.log(quantity);
    // Eliminar producto del array
    carrito = carrito.filter(producto => (producto.quantityAdded !== quantity && producto.name !== name));
    console.log(carrito);

    // Actualizar el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Obtener la URL de la página actual
    let url = window.location.pathname;
    let filename = url.substring(url.lastIndexOf('/') + 1);

    // Actualizar el DOM solo si la página actual es 'user.html'
    if (filename == 'user.html') {
        mostrarCarrito();
    }
}

function pagoCompleto(){
    const facturas = [];
    for(const orderIndex in carrito){
        const order = carrito[orderIndex];
        const product = productos.find(producto => producto.name === order.name);

        if(order.quantityAdded > product.quantity){
            if(!confirm("El producto " + order.name + " no tiene suficientes existencias! ¿Desea continuar?")){
                window.location.href = 'user.html';
                return;
            }
        }

        const index = productos.findIndex(producto => producto.name === order.name);
        if (index === -1) {
            if(!confirm("El producto " + order.name + " ha sido retirado de stock! ¿Desea continuar?")){
                window.location.href = 'user.html';
                return;
            }
        } else {
            productos[index].quantity = product.quantity - order.quantityAdded;
            facturas.push(order);
        }
    }

    localStorage.setItem('factura', JSON.stringify(facturas));
    localStorage.setItem('productos', JSON.stringify(productos));

    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));

    window.location.href = 'invoice.html';
}

function pagar(){
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const facturas = [];

    if(name === 'all'){
        pagoCompleto();
        return;
    }

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
    facturas.push(order);

    localStorage.setItem('factura', JSON.stringify(facturas));
    localStorage.setItem('productos', JSON.stringify(productos));

    eliminarProductoCarrito(name);

    window.location.href = 'invoice.html';
}

function estaVacio(obj) {
    if (Object.keys(obj).length === 0) {
        return true;
    }
    return false;
}
