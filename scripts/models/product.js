class Product{
    constructor(name,id,desc,url,price){
        this.name=name;
        this.id=id;
        this.desc=desc;
        this.url=url['url'];
        this.price=price;
        this.isAddedToCart=false;
    }
}

export default Product;