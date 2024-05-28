document.addEventListener('DOMContentLoaded', function() {
    mostrarFactura();
});

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

function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const facturas = JSON.parse(localStorage.getItem('factura')) || [];
    if (facturas.length === 0) return;

    doc.setFontSize(20);
    doc.text('Factura', 10, 10);

    let yOffset = 20;

    facturas.forEach(producto => {
        doc.setFontSize(12);
        doc.text(`Producto: ${producto.name}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Descripción: ${producto.description}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Precio: $${producto.price}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Cantidad: ${producto.quantityAdded}`, 10, yOffset);
        yOffset += 10;
    });

    const total = facturas.reduce((acc, producto) => acc + producto.price * producto.quantityAdded, 0);
    doc.setFontSize(16);
    doc.text(`Total: $${total.toFixed(2)}`, 10, yOffset);

    doc.save('factura.pdf');
}