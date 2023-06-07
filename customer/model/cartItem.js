function CartItem(id,name,price,screen,backCamera,fontCamera,img,desc,type,quality = 0 ,sumTotal = 0 ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = fontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.quality = quality;
    this.sumTotal = sumTotal;

    this.plusQuality =  () => {
        this.quality = this.quality + 1;
        return this.quality;
    };

    this.subQuality =  () => {
        if ((this.quality) > 0 ) {
            this.quality = this.quality -1;
            return this.quality;
        } else {
            return this.quality;
        };
    };

    this.sumMoney =  () => {
        this.sumTotal = this.price * this.quality;
        return this.sumTotal;
    };
};