import Product from '../models/product.js';
import makeNetworkCall from '../services/api-client.js';

const productOperations={
    productsPizza: [],
    async loadProducts(){
        const data=await makeNetworkCall();
        const pizzaArray=data['Vegetarian'];
        // console.log(pizzaArray);
        const productArray=pizzaArray.map(pizza=>{
            const currentPizza=new Product(pizza.name,pizza.id,pizza.menu_description,pizza.assets.product_details_page[0],pizza.price);
            return currentPizza;
        });
        // console.log(productArray);
        this.productsPizza=productArray;
        return productArray;
    },
    search(pizzaId){
        const resultPizza=this.productsPizza.find(currentPizza=>currentPizza.id==pizzaId);
        resultPizza.isAddedToCart=true;
        // console.log(resultPizza);
        return resultPizza;
    },
    getCartItems(){
        const pizzasInCart=this.productsPizza.filter(pizzaOne=>pizzaOne.isAddedToCart==true);
        return pizzasInCart;
    }
}

export default productOperations;