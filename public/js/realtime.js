const socket = io();

socket.on('productsUpdated', (products) => {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products.forEach((p) => {
        const div = document.createElement('div');
        div.className = 'col-12 col-md-6 col-lg-4';
        div.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${p.title}</h5>
                    <p class="card-text">${p.description}</p>
                </div>
                <div class="card-footer bg-transparent d-flex justify-content-between align-items-center">
                    <span class="fw-bold">$${p.price}</span>
                    <small class="text-muted">Stock: ${p.stock}</small>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
});