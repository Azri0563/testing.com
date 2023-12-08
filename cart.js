let cart = [];
let totalPrice = 0;

function addToCart(button) {
    const item = button.parentNode;
    const itemId = item.querySelector('h2').getAttribute('data-item-id');
    const itemName = item.querySelector('h2').getAttribute('data-item-name');
    const itemPrice = parseFloat(item.querySelector('h2').getAttribute('data-item-price'));
    const itemImage = item.querySelector('h2').getAttribute('data-item-image');

    const existingItem = cart.find(item => item.id === itemId);

    saveCartToLocalStorage();

    if (existingItem) {
        existingItem.quantity += 1; // Increment the quantity if the item is already in the cart
    } else {
        cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1, image: itemImage });
    }

    updateCart();

    updateCartBadge();
}

function saveCartToLocalStorage() {
localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
const cartItemsElement = document.getElementById('cartItems');
const totalElement = document.getElementById('totalPrice');

window.onload = () => {
const storedCart = localStorage.getItem('cart');

if (storedCart) {
cart = JSON.parse(storedCart);
}

updateCart();
};

cartItemsElement.innerHTML = '';

cart.forEach(item => {
const li = document.createElement('li');

const img = document.createElement('img');
img.src = item.image;
img.alt = item.name;
img.style.width = '150px';

li.appendChild(img);

const span = document.createElement('span');
span.textContent = `${item.name} x ${item.quantity} - RM ${item.price.toFixed(2)}`;

li.appendChild(span);

const removeButton = document.createElement('button');
removeButton.textContent = 'Remove';
removeButton.className = 'remove-btn';
removeButton.onclick = () => removeItem(item.id);

li.appendChild(removeButton);

cartItemsElement.appendChild(li);
});

totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
totalElement.textContent = `Total: RM ${totalPrice.toFixed(2)}`;
}

function removeItem(itemId) {
const itemIndex = cart.findIndex(item => item.id === itemId);

if (itemIndex !== -1) {
cart.splice(itemIndex, 1);
}

updateCart();

updateCartBadge();

saveCartToLocalStorage();
}

function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartBadge.textContent = totalQuantity.toString();
}

function toggleCart() {
    const cartElement = document.getElementById('cart');
    const modalOverlay = document.getElementById('modalOverlay');

    if (cartElement.style.display === 'none' || cartElement.style.display === '') {
    cartElement.style.display = 'block';
    modalOverlay.style.display = 'block';
    } 

    else {
    cartElement.style.display = 'none';
    modalOverlay.style.display = 'none';
    }
}

function checkout() {
showConfirmationPopup();
}