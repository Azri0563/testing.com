var buttons = document.getElementsByClassName('buy-button');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        alert('Product added to cart!');
    });
}