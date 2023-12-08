function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function displayCartItems(cart) {
    const cartItemsContainer = document.getElementById('cartItems2');

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;

        cartItemDiv.appendChild(img);

        const itemDetails = document.createElement('div');
        itemDetails.style.display = 'flex';
        itemDetails.style.flexDirection = 'column';
        itemDetails.style.alignItems = 'center';

        itemDetails.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Price: RM ${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
        `;

        cartItemDiv.appendChild(itemDetails);

        cartItemsContainer.appendChild(cartItemDiv);
    });
}

const cartData = getParameterByName('cart');
let cart = [];

try {
    cart = cartData ? JSON.parse(decodeURIComponent(cartData)) : [];

    if (!Array.isArray(cart)) {
        console.error('Invalid cart data:', cartData);
        cart = [];
    }
} catch (error) {
    console.error('Error parsing cart data:', error);
    cart = [];
}

window.onload = () => displayCartItems(cart);

function processPayment() {
    showThankYouPopup();
}

function displayTotalPrice(cart) {
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

cart.forEach(item => {
    totalPrice += item.price * item.quantity;
});

totalPriceElement.textContent = `Total Price: RM ${totalPrice.toFixed(2)}`;
}

function hideCancelOrderPopup() {
    const cancelOrderPopup = document.getElementById('cancelOrderPopup');
    cancelOrderPopup.style.display = 'none';
}

function showCancelOrderPopup() {
    const cancelOrderPopup = document.getElementById('cancelOrderPopup');
    cancelOrderPopup.style.display = 'block';
}

function confirmReturnToMenu() {
    console.log('Clear All Item button clicked');
    showCancelOrderPopup();
}

function returnToMenuConfirmed() {
    console.log('Returning to menu confirmed');
    hideCancelOrderPopup();
    window.location.href = 'Index.html';
}

function handleOkButtonClick() {
    closeThankYouPopup();
    returnToMenu();
}

function showThankYouPopup() {
    const thankYouPopup = document.getElementById('thankYouPopup');
    thankYouPopup.style.display = 'block';

    const okButton = document.querySelector('#thankYouPopup button');
    okButton.addEventListener('click', handleOkButtonClick);
}

function closeThankYouPopup() {
    const thankYouPopup = document.getElementById('thankYouPopup');
    thankYouPopup.style.display = 'none';
}

function returnToMenu() {
    window.location.href = 'confirmpayment.html';
}

window.onload = () => {
    displayCartItems(cart);
    displayTotalPrice(cart); // Call displayTotalPrice after displaying cart items
};

// Display items and total price when the page loads
//window.onload = () => {
//    displayCartItems(cart);
//    displayTotalPrice(cart);
//};

/**/
//function processPayment() {
//    var paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    // Assuming you have the total price calculated somewhere in your JavaScript
//    var totalPrice = 1999;  // Replace this with your actual total price

    // Send payment details to the server using AJAX
//    var xhr = new XMLHttpRequest();
//    xhr.open('POST', 'payment_process.php', true);
//    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//    xhr.onreadystatechange = function () {
//        if (xhr.readyState === 4 && xhr.status === 200) {
//            var response = JSON.parse(xhr.responseText);

//            if (response.success) {
                // Payment successful, show thank you popup or perform other actions
//                showThankYouPopup();
//            } else {
                // Payment failed, handle the error (e.g., show an error message)
//                alert('Payment failed: ' + response.message);
//            }
//        }
//    };

    // Send data as a URL-encoded string
//    var data = 'paymentMethod=' + encodeURIComponent(paymentMethod) +
//               '&totalPrice=' + encodeURIComponent(totalPrice);
//    xhr.send(data);
//}
/**/