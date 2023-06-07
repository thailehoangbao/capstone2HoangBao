document.querySelector('#cart-box-icon').onclick = function () {
    document.querySelector('#cart-box-id').classList.remove('act-out');
    document.querySelector('#cart-box-id').classList.add('act-in');
};

document.querySelector('#continueShop').onclick = function () {
    document.querySelector('#cart-box-id').classList.remove('act-in');
    document.querySelector('#cart-box-id').classList.add('act-out');
};