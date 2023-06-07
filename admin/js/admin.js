var api = new Api();

var domID = function (id) {
    return document.getElementById(id);
};
//render danh sách sản phẩm từ server 
function fetchProductList() {
    api
        .callApi('Products', 'GET', null)
        .then(function (response) {
            var myData = response.data;
            renderProductList(response.data);
            findItem(myData);
        })
        .catch(function (err) {
            console.log(err);
        })
};
fetchProductList();


// xoa Sp trên server 
function xoaSP(id) {
    // forEach reduce map findIndex 
    api
        .callApi(`Products/${id}`, 'DELETE', null)
        .then(function (response) {
            //gọi lại API lấy danh sách sản phẩm mới nhất từ sever
            fetchProductList();
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        })
};

/**
 * Add sp 
 */
domID('btnAdd').onclick = function (e) {
    var product = layThongTinNguoiDung('');
    if ( product !== null ) {
        $('#exampleModal').modal('show');
        api
            .callApi('Products', 'POST', product)
            .then(function (response) {
                document.getElementsByClassName('close-item')[0].click();
                console.log(response);
                fetchProductList();
            })
            .catch(function (error) {
                console.log(error);
            })
    } else {
        $('#exampleModal').modal('hide');
    };
};

// Sửa sp
var suaSP = (id) => {
    var btnUpdateProduct = `<button class='btn btn-outline-success' onclick='updateProduct(${id})'>Update</button>
    <button type="button" class="btn btn-outline-danger close-update" data-dismiss="modal">
        Close
    </button>
    `;
    document.getElementsByClassName('modal-footer')[0].innerHTML = btnUpdateProduct;
    api
        .callApi(`Products/${id}`, 'GET', null)
        .then(function (response) {
            console.log(response.data);
            //show thông tin
            domID('TenSP').value = response.data.name;
            domID('GiaSP').value = response.data.price;
            domID('ScreenSP').value = response.data.screen;
            domID('backCamera').value = response.data.backCamera;
            domID('fontCamera').value = response.data.frontCamera;
            domID('imgPhone').value = response.data.img;
            domID('DescSP').value = response.data.desc;
            // domID('inputGroupSelect01').innerHTML = response.data.type;
        })
        .catch(function (error) {
            console.log(error);
        })
}

//update sp
var updateProduct = function (id) {
    var product = layThongTinNguoiDung(id);

    api
        .callApi(`Products/${id}`,'PUT', product)
        .then(function (response) {
            document.getElementsByClassName('close-update')[0].click();
            console.log(response);
            //fetch product list
            fetchProductList();
        })
        .catch(function (error) {
            console.log(error);
        })
}

//tim kiếm sp
var findItem = function (data) {
    document.querySelector('#searchItem').addEventListener('keyup', function (e) {
        var valueSearch = e.target.value;
        let newArrFinded = timKiemItem(valueSearch, data);
        renderProductList(newArrFinded);
    });
};

domID('upPrice').onclick = function () {
    api
    .callApi('Products', 'GET', null)
    .then(function (response) {
        var myData = response.data;
        let newArrTangDan = xapXepTangDan(myData);
        renderProductList(newArrTangDan);
    })
    .catch(function (err) {
        console.log(err);
    })
};

domID('downPrice').onclick = function () {
    api
    .callApi('Products', 'GET', null)
    .then(function (response) {
        var myData = response.data;
        let newArrGiamDan = xapXepGiamDan(myData);
        renderProductList(newArrGiamDan);
    })
    .catch(function (err) {
        console.log(err);
    })
};