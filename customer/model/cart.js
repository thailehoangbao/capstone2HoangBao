function Cart () {
    this.arrCart = [];
    // this.cartClickItems = [];
    this.tongItem = 0;

    this.themGioHangSP = function (ob) {
        if ( this.arrCart.length === 0 ) {
            this.arrCart.push(ob);
            console.log(ob.quality);
            this.tongItem += 1;
        } else if ( (this.kiemTraTonTai(ob,this.arrCart)) == 0 ) {
            this.arrCart.push(ob);
            this.tongItem += 1;
        } else if ( (this.kiemTraTonTai(ob,this.arrCart)) == 1) {
            this.tongItem += 0;
        }
    };
    this.kiemTraTonTai = function (ob, arr) {
        let dem = 0;
        for (let i = 0; i < arr.length; i++) {
            if (ob.id == arr[i].id) {
                dem = dem + 1;
                return dem;
            };
        };
        return dem;
    };
    this.timViTri = function (ob) {
        let index = -1;
        for (let i = 0; i < this.arrCart.length; i++) {
            let cart = this.arrCart[i];
            if (cart.id == ob.id ) {
                index = i;
                return index;
            };
        };   
    };
    this.removeCart = function (ob,arr,newAmount,tongItems) {
        let index = this.timViTri(ob);
        arr.splice(index,1);
        let result = (tongItems - newAmount);
        this.tongItem = result;
        domID('amountItem').innerHTML = result;
    };
    // this.addSumMoney = function () {
    //     for
    // };
    this.total = function (arr) {
        let total = 0;
        for (let i = 0; i < arr.length ; i++) {
            let item = arr[i];
            total += item.sumTotal;
        }
        return total;
    };
};