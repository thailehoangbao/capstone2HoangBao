let listCart = new Cart();
let domID = function (id) {
    return document.getElementById(id);
};
getLocalStorage(listCart);
//render danh sách sản phẩm từ server 
function fetchProductList() {
    axios(
        {
            url: 'https://6471f35e6a9370d5a41adcae.mockapi.io/Products',
            method: 'GET'
        })
        .then(response => {
            let myData = response.data;
            renderProductList(myData);
            selectItems(myData);
            dropdownMenu(myData);
        })
        .catch(function (err) {
            console.log(err);
        })
};
fetchProductList();


// Dropdown Menu
var dropdownMenu = function (arr) {
    document.querySelector('#dropdown-menu-phone').addEventListener('click', function (e) {
        if ((e.target.value) == 2) {
            let ipArr = selectItems(arr)[0];
            renderProductList(ipArr);
            return;
        } else if ((e.target.value) == 3) {
            let samsungArr = selectItems(arr)[1];
            renderProductList(samsungArr);
            return;
        } else {
            renderProductList(arr);
            return;
        };
    })
};

//Click vào nút button thêm giỏ hàng
function idItem(id) {
    axios(
        {
            url: `https://6471f35e6a9370d5a41adcae.mockapi.io/Products/${id}`,
            method: 'GET',
        }
    )
        .then(res => {
            let myData1 = res.data;
            var itemCart = new CartItem(myData1.id, myData1.name, myData1.price, myData1.screen, myData1.backCamera, myData1.frontCamera, myData1.img, myData1.desc, myData1.type);
            itemCart.plusQuality();
            itemCart.sumMoney();
            listCart.themGioHangSP(itemCart);
            renderCartItem(listCart.arrCart);
            domID('amountItem').innerHTML = listCart.tongItem;
            //gọi hàm sumTotal để tính tổng tiền ra bill giá trị các sp đã chọn
            sumTotalItems(listCart);
            setLocalStorage(listCart.arrCart,listCart.tongItem);
        })
        .catch(err => {
            console.log(err)
        })
};

//click vào nút plus 
var btnPlus = function (id) {
    axios(
        {
            url: `https://6471f35e6a9370d5a41adcae.mockapi.io/Products/${id}`,
            method: 'GET',
        }
    )
        .then(res => {
            let myData1 = res.data;
            let index = listCart.timViTri(myData1);
            let newPlustract = listCart.arrCart[index].plusQuality();
            let total = listCart.arrCart[index].sumMoney();
            listCart.tongItem++;
            document.querySelector(`#resultAmount${id}`).innerHTML = newPlustract;
            document.querySelector(`#resultMoney${id}`).innerHTML = total;
            //gọi hàm sumTotal để tính tổng tiền ra bill giá trị các sp đã chọn
            sumTotalItems(listCart);
            setLocalStorage(listCart.arrCart,listCart.tongItem);
        })
        .catch(err => {
            console.log(err)
        })
}


//click vào nút subtract 
var btnSubtract = function (id) {
    axios(
        {
            url: `https://6471f35e6a9370d5a41adcae.mockapi.io/Products/${id}`,
            method: 'GET',
        }
    )
        .then(res => {
            let myData1 = res.data;
            let index = listCart.timViTri(myData1);
            let newSubtract = listCart.arrCart[index].subQuality();
            let total = listCart.arrCart[index].sumMoney();
            listCart.tongItem--;
            document.querySelector(`#resultAmount${id}`).innerHTML = newSubtract;
            document.querySelector(`#resultMoney${id}`).innerHTML = total;
            //gọi hàm sumTotal để tính tổng tiền ra bill giá trị các sp đã chọn
            sumTotalItems(listCart);
        })
        .catch(err => {
            console.log(err)
        })
};

var removeCart = function (id) {
    axios(
        {
            url: `https://6471f35e6a9370d5a41adcae.mockapi.io/Products/${id}`,
            method: 'GET',
        }
    )
        .then(res => {
            let myData1 = res.data;
            var num = domID(`resultAmount${myData1.id}`).innerHTML * 1;
            listCart.removeCart(myData1, listCart.arrCart, num, listCart.tongItem);
            renderCartItem(listCart.arrCart);
            //gọi hàm sumTotal để tính tổng tiền ra bill giá trị các sp đã chọn
            sumTotalItems(listCart);
            setLocalStorage(listCart.arrCart, listCart.tongItem);
        })
        .catch(err => {
            console.log(err)
        })
};

function setLocalStorage(arr, tongItem) {
    //convert Json => String
    var dataString = JSON.stringify(arr);
    var dataTongItems = JSON.stringify(tongItem);
    //set localStorage
    localStorage.setItem("DSCartItem", dataString);
    localStorage.setItem("dataTongItems", dataTongItems);
};

function getLocalStorage(list) {
    //check condition
    if (localStorage.getItem("DSCartItem")) {
        var dataString = localStorage.getItem("DSCartItem");
        var dataTongItems = localStorage.getItem("dataTongItems");

        //convert String => Json
        let arrDataString = JSON.parse(dataString);
        let tongItems = JSON.parse(dataTongItems);
        let updateDataString = arrDataString.map((data,index) => {
            let newDataString = new CartItem(data.id, data.name, data.price, data.screen, data.backCamera, data.frontCamera, data.img, data.desc, data.type ,data.quality,data.sumTotal);

            return newDataString;
        });
        list.arrCart = [...updateDataString];
        list.tongItem = tongItems;

        //render table, show items
        renderCartItem(arrDataString);
        domID('amountItem').innerHTML = tongItems;
    };
};

domID('emptyCart').onclick = function (e) {
    listCart.arrCart = [];
    listCart.tongItem = 0;
    domID('amountItem').innerHTML = listCart.tongItem;
    renderCartItem(listCart.arrCart);
    document.querySelector('#Subtotal').innerHTML = ``;
    document.querySelector('#Shipping').innerHTML = ``;
    document.querySelector('#Tax').innerHTML = ``;
    document.querySelector('#Total').innerHTML = ``;
    setLocalStorage(listCart.arrCart,listCart.tongItem);
};

domID('payNow').onclick = function (e) {
    if ( listCart.arrCart.length !== 0 ) {
        listCart.arrCart = [];
        listCart.tongItem = 0;
        domID('amountItem').innerHTML = listCart.tongItem;
        renderCartItem(listCart.arrCart);
        document.querySelector('#Subtotal').innerHTML = ``;
        document.querySelector('#Shipping').innerHTML = ``;
        document.querySelector('#Tax').innerHTML = ``;
        document.querySelector('#Total').innerHTML = ``;
        domID('continueShop').click();
        setLocalStorage(listCart.arrCart,listCart.tongItem);
    } else if ( listCart.arrCart.length === 0 ) {
        domID('alert').innerHTML = 'Empty Error';
        domID('alert').style.fontSize = '2rem';
        domID('alert__icon').parentNode.removeChild(domID('alert__icon'));
        domID('alert__icon__container').innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>`;
        document.getElementsByClassName('fa-circle-exclamation')[0].style.color = 'red';
        document.getElementsByClassName('around-container')[0].style.borderColor = 'transparent';
    };
};
