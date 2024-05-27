document.addEventListener('DOMContentLoaded', mostrarFactura);

function mostrarFactura() {
    const invoiceContainer = document.getElementById('invoiceContainer');
    const facturas = JSON.parse(localStorage.getItem('factura')) || [];

    if (facturas.length === 0) {
        invoiceContainer.innerHTML = '<p>No hay productos en la factura.</p>';
        return;
    }

    let total = 0;
    facturas.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'card mb-4';
        productoDiv.innerHTML = `
            <div class="card-body">
                <h4 class="card-title">${producto.name}</h4>
                <p class="card-text">${producto.description}</p>
                <p class="card-text">$${producto.price}</p>
                <p class="card-text">Cantidad: ${producto.quantityAdded}</p>
                <img src="${producto.image}" alt="${producto.name}" style="width: 100px; height: 100px;">
            </div>
        `;
        total += producto.price * producto.quantityAdded;
        invoiceContainer.appendChild(productoDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'card';
    totalDiv.innerHTML = `
        <div class="card-body">
            <h4>Total: $${total.toFixed(2)}</h4>
        </div>
    `;
    invoiceContainer.appendChild(totalDiv);
}