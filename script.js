// Function to add item to cart
function addToCart(id, name, price, image) {
    // 1. Get existing cart from LocalStorage, or create an empty array if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Check if the product is already in the cart
    let existingProduct = cart.find(product => product.id === id);

    if (existingProduct) {
        // If it exists, just increase the quantity
        existingProduct.quantity += 1;
    } else {
        // If it doesn't exist, add it as a new item
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    // 3. Save the updated cart back to LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // 4. Alert the user (You can replace this with a nicer popup later)
    alert(name + " has been added to your cart!");
}



// ... (Keep your addToCart function at the top) ...

// Function to Display Cart Items on cart.html
function displayCart() {
    let cartItems = localStorage.getItem('cart');
    cartItems = JSON.parse(cartItems);
    let cartContainer = document.querySelector("#cart-body");
    let cartTotal = document.querySelector("#cart-total");
    let cartSubtotal = document.querySelector("#cart-subtotal");

    // Check if we are on the cart page and if cart has items
    if (cartItems && cartContainer) {
        cartContainer.innerHTML = ''; // Clear current content
        Object.values(cartItems).map(item => {
            cartContainer.innerHTML += `
            <tr>
                <td><i class="fa-solid fa-trash-can" onclick="removeItem(${item.id})"></i></td>
                <td><img src="${item.image}" alt=""></td>
                <td><h5>${item.name}</h5></td>
                <td><h5>$${item.price}</h5></td>
                <td><h5>${item.quantity}</h5></td>
                <td><h5>$${item.price * item.quantity}</h5></td>
            </tr>
            `;
        });

        // Calculate Total
        let totalCost = 0;
        cartItems.forEach(item => {
            totalCost += (item.price * item.quantity);
        });
        
        // Update HTML for totals
        if(cartSubtotal) cartSubtotal.textContent = "$" + totalCost + ".00";
        if(cartTotal) cartTotal.textContent = "$" + (totalCost + 10) + ".00"; // Adding $10 shipping
    }
}

// Function to Remove item from cart
function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    
    // Filter out the item with the matching ID
    let updatedCart = cart.filter(item => item.id !== id);
    
    // Update LocalStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Refresh the display
    displayCart();
}