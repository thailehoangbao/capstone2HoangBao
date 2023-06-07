var renderProductList = function (productArray) {
    // console.log('Product Array : ', productArray);
    var contentHTML = '';
    for (var i = 0; i < productArray.length; i++) {
        var product = productArray[i];
        contentHTML += `
        <div class="col-lg-3 col-md-6 col-12 pb-3">
            <div class="card card-item">
                <img class="card-img-top img-fluid" src="${product.img}" alt="">
                <div class="card-body">
                    <h4 class="card-title" id="nameSP">${product.name}</h4>
                    <p class="card-text" id="priceSP">$${product.price}<span id="saleOff-Price" style="text-decoration: line-through; color: red;">$${(product.price * 1.1).toFixed(0)}</span></p>
                    <span class="card-info" id="typeSP">${product.type}</span>
                    <p class="mt-2 card-desc">Description:${product.desc}<span id="descSP"></span></p>
                    <div class="card-star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <a href="#">In Stock</a>
                    </div>
                </div>
                <div class="content-card">
                    <h1 class="heading-info-card">Specification</h1>
                    <p id="screenSP">Screen:${product.screen}</p>
                    <p id='backCamera'>Back Camera:${product.backCamera}</p>
                    <p id="fontCamera">Font Camera:${product.frontCamera}</p>
                    <a href="#" class="detail-card">Click here for more detail</a>
                </div>
                <div class="btnAddCard">
                    <button class="btn btn-outline-info" id="btnAddCart${product.id}" onclick="idItem(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
        `;
    };

    // dom tới tbody
    document.getElementById('contentItemPhone').innerHTML = contentHTML;
};

//Select items 

var selectItems = function (arr) {
    let listArray = [];
    listArray[0] = [];
    listArray[1] = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item.type === 'iphone' || item.type === 'Iphone') {
            listArray[0].push(item);
        }
        else if (item.type === 'Samsung' || item.type === 'samsung') {
            listArray[1].push(item);
        };
    };
    // console.log(listArray);
    return listArray;
};

var renderCartItem = function (arr) {
    let amountItems = arr.length;
    let contentCart = '';
    for (let i = 0; i < amountItems; i++) {
        let item = arr[i];
        contentCart += `
        <div class="row p-2">
            <div class="col-sm-6 pr-0">
                <img src="${item.img}" class="img-fluid cart-img" alt="">
            </div>
            <div class="col-sm-6 pl-0">
                <p class="mt-2">${item.name}</p>
                <p>Back Camera:${item.backCamera}</p>
                <p class="mb-0">Font Camera:${item.frontCamera}</p>
                <button onclick='removeCart(${item.id})' class='btn btn-outline-danger'>Remove</button>
            </div>
        </div>
        <div class="row p-2">
            <div class='col-sm-12 p-0 button-quality-group'>
                <Span>Quality:</Span>
                <button onclick='btnSubtract(${item.id})'>-</button>
                <span id='resultAmount${item.id}'>${item.quality}</span>
                <button onclick='btnPlus(${item.id})'>+</button>
                <span id='resultMoney${item.id}'>${item.sumTotal}$</span>
            </div>
        </div>
        <hr />
        `;
    }
    document.querySelector('#resultCartItem').innerHTML = contentCart;
};

//Hàm tính tiền bill items
var sumTotalItems = function (list) {
    domID('amountItem').innerHTML = listCart.tongItem;
    let SumTotal = list.total(list.arrCart);
    if ( SumTotal == 0 ) {
        document.querySelector('#Subtotal').innerHTML = ``;
        document.querySelector('#Shipping').innerHTML = ``;
        document.querySelector('#Tax').innerHTML = ``;
        let fullTotal = SumTotal + 10 + SumTotal * 10 / 100;
        document.querySelector('#Total').innerHTML = ``;
    } else {
        document.querySelector('#Subtotal').innerHTML = `${SumTotal}$`;
        document.querySelector('#Shipping').innerHTML = `${10}$`;
        document.querySelector('#Tax').innerHTML = `${(SumTotal/ 100)}$`;
        let fullTotal = SumTotal + 10 + SumTotal * 10 / 100;
        document.querySelector('#Total').innerHTML = `${fullTotal}$`;
    };
};
