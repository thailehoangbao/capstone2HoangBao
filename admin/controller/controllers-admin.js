var validation = new Validation();
var renderProductList = function (productArray) {
    console.log('Product Array : ', productArray);
    var contentHTML = '';
    for (var i = 0; i < productArray.length; i++) {
        var product = productArray[i];
        contentHTML +=
            `<tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}$</td>
            <td>
                <img style='width: 150px; height: 150px' src="${product.img}" alt="" class='img-fluid'/>
            </td>
            <td>${product.desc}</td>
            <td>
                <button class='btn btn-danger w-100' onclick="xoaSP(${product.id})">delete</button>
                <button class='btn btn-warning w-100' onclick="suaSP(${product.id})" data-toggle="modal"
                data-target="#myModal">edit</button>
            </td>
        </tr>`;
    };
    // dom tới tbody
    document.getElementById('tblDanhSachSP').innerHTML = contentHTML;
};


var timKiemItem = function (keyword, array) {
    var mangTimKiem = [];
    for (var i = 0; i < array.length; i++) {
        var item = array[i].name;
        //Chuyển keyword về chữ viết thường
        var keywordToLowerCase = keyword.toLowerCase();
        //Chuyển sv.tenSV về chữ viết thường
        var tenSVToLowerCase = item.toLowerCase();
        if (tenSVToLowerCase.indexOf(keywordToLowerCase) !== -1) {
            mangTimKiem.push(array[i]);
        };
    };
    return mangTimKiem;
};

var layThongTinNguoiDung = function (id) {
    var tenSP = domID('TenSP').value;
    var GiaSP = domID('GiaSP').value;
    var ScreenSP = domID('ScreenSP').value;
    var backCamera = domID('backCamera').value;
    var fontCamera = domID('fontCamera').value;
    var imgPhone = domID('imgPhone').value;
    var DescSP = domID('DescSP').value;
    var selectSP = domID('inputGroupSelect01').options[domID('inputGroupSelect01').selectedIndex].text;
    /**
       * Validation
    */
    var isValid = true;
    //Validation Phone Name
    isValid &= validation.kiemTraRong(tenSP, "errorTenSP", "(*) Vui lòng nhập Tên Sản Phẩm");

    //Validation Price
    isValid &= validation.kiemTraRong(GiaSP, "errorGiaSP", "(*) Vui lòng nhập Giá Sản Phẩm")
        && validation.kiemTraPattern(GiaSP, /^[0-9]+$/, "errorGiaSP", "(*)Trường này phải là kiểu dữ liệu số (Number)");

    //Validation Screen 
    isValid &= validation.kiemTraRong(ScreenSP, "errorScreenSP", "(*) Vui lòng nhập Tên Màng Hình Sản Phẩm");
    //Validation back Camera 
    isValid &= validation.kiemTraRong(backCamera, "errorbackCamera", "(*) Vui lòng nhập Back Camera Sản Phẩm");
    //Validation front Camera 
    isValid &= validation.kiemTraRong(fontCamera, "errorfontCamera", "(*) Vui lòng nhập Front Camera Sản Phẩm");
    //Validation link url ảnh  
    isValid &= validation.kiemTraRong(imgPhone, "errorimgPhone", "(*) Vui lòng nhập link ảnh Sản Phẩm")
        && validation.kiemTraPattern(imgPhone, /\.(jpeg|jpg|gif|png|bmp)$/i, "errorimgPhone", "(*)Trường này phải là kiểu dữ liệu link hình ảnh!");
    //Validation Desc img 
    isValid &= validation.kiemTraRong(DescSP, "errorDescSP", "(*) Vui lòng nhập Mô tả Sản Phẩm");
    //Validation Selections
    isValid &= validation.kiemTraSelect("inputGroupSelect01",'errorSelect01', "(*) Vui lòng chọn loại Sản Phẩm!");
    if (!isValid) return null;
    //tạo đối tượng product từ lớp đối tượng product
    var product = new Product(id, tenSP, GiaSP, ScreenSP, backCamera, fontCamera, imgPhone, DescSP, selectSP);
    
    return product;
};

var xapXepTangDan = function (arr) {
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - i - 1; j++) {
            if (arr[j].price > arr[j + 1].price) {
                // Hoán đổi giá trị của hai phần tử
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
};

var xapXepGiamDan = function (arr) {
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - i - 1; j++) {
            if (arr[j].price < arr[j + 1].price) {
                // Hoán đổi giá trị của hai phần tử
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
};