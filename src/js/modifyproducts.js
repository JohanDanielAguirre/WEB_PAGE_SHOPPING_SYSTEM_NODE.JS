document.addEventListener('DOMContentLoaded', mostrarProductoAModificar);
let productos = JSON.parse(localStorage.getItem('productos')) || [];
function mostrarProductoAModificar() {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('name');

    const producto = getProductByName(productName);
    if (!producto) {
        console.error(`No se encontró ningún producto con el nombre "${productName}".`);
        return;
    }

    const form = `
        <form id="productForm">
            <input type="hidden" id="productName" name="productName" value="${producto.name}" readonly>
            <div>
                <label for="productPrice">Precio del Producto</label>
                <input type="number" id="productPrice" name="productPrice" value="${producto.price}" required>
            </div>
            <div>
                <label for="quantity">Cantidad del Producto</label>
                <input type="number" id="quantity" name="quantity" value="${producto.quantity}" required>
            </div>
            <div>
                <label for="productDescription">Descripción del Producto</label>
                <textarea id="productDescription" name="productDescription" rows="4" required>${producto.description}</textarea>
            </div>
            <div>
                <label for="productImageLink">Link a una Imagen</label>
                <input type="url" id="productImageLink" name="productImageLink" value="${producto.image}" required>
            </div>
            <div>
                <button type="button" onclick="guardarCambios()">Guardar Cambios</button>
            </div>
        </form>
    `;

    const container = document.getElementById('productContainer');
    container.innerHTML = form;
}

function getProductByName(name) {
    return productos.find(producto => producto.name === name);
}

function guardarCambios() {
    const nombre = document.getElementById("productName").value;
    const precio = document.getElementById("productPrice").value;
    const cantidad = document.getElementById("quantity").value;
    const descripcion = document.getElementById("productDescription").value;
    const foto = document.getElementById("productImageLink").value;

    const index = productos.findIndex(producto => producto.name === nombre);
    if (index === -1) {
        console.error(`No se encontró ningún producto con el nombre "${nombre}".`);
        return;
    }

    // Actualizar los datos del producto
    productos[index].price = precio;
    productos[index].quantity = cantidad;
    productos[index].description = descripcion;
    productos[index].image = foto;

    // Actualizar localStorage y redirigir a la página de administración
    localStorage.setItem('productos', JSON.stringify(productos));
    window.location.href = 'admin.html';
}
