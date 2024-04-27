document.addEventListener('DOMContentLoaded', function () {
    
    fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById('productList');
        productList.innerHTML = products.map(product => `
            <div class="product-item">
                <img src="${product.src}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.ratings}</p>
                <button onclick="addToCart(${product.productId})">Add to Cart</button>
            </div>
        `).join('');
    })
    .catch(error => console.error('Error:', error));

  
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('loggedInUser').textContent = `Welcome, ${loggedInUser.name}`;
    }

    fetch('http://localhost:3000/allUsersCart')
    .then(response => response.json())
    .then(carts => {
        let totalPrice = 0;
        for (const user in carts) {
            if (carts.hasOwnProperty(user)) {
                const cartItems = carts[user];
                cartItems.forEach(item => {
                    totalPrice += item.price;
                });
            }
        }
        document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
    })
    .catch(error => console.error('Error:', error));
});


function addToCart(productId) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Please login to add items to cart.');
        return;
    }

    fetch(`http://localhost:3000/allUsersCart/${loggedInUser.name}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
    })
    .then(response => {
        if (response.ok) {
            alert('Product added to cart!');
            window.location.reload(); 
        } else {
            alert('Error adding product to cart!');
        }
    })
    .catch(error => console.error('Error:', error));
}
