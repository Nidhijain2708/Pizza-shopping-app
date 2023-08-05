import productOperations from "../services/product-operation.js";

async function loadPizzas(){
    const pizzasArray=await productOperations.loadProducts();
    // console.log(pizzasArray);
    pizzasArray.forEach((pizza)=>{
        prepareCard(pizza);
    })
}
loadPizzas();

/* <div class="card col-4">
    <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div> */

function addToCart(){
    // console.log(this);
    const clickedBtn=this;
    const pizzaId=clickedBtn.getAttribute('product_id');
    const resultPizza=productOperations.search(pizzaId);
    printBasket();
}

function printBasket(){
    const cartItems=productOperations.getCartItems();
    const basket=document.querySelector('#basket');
    basket.innerHTML='';
    var totalPrice=0;
    cartItems.forEach((currentPizza)=>{
        const cartDiv=document.createElement('div');
        cartDiv.innerText=`NAME: ${currentPizza.name} , PRICE: ${currentPizza.price}`;
        basket.appendChild(cartDiv);
        totalPrice+=parseFloat(currentPizza.price);
    })
    const toPayDiv=document.querySelector('#Price');
    // toPayDiv.innerText=`Total Amount: ${totalPrice.toPrecision(4)}`;
    var GstAmount=(0.18*totalPrice)+totalPrice;
    toPayDiv.innerText=`Total Amount with 18% GST: ${GstAmount.toPrecision(4)}`;
}

function prepareCard(pizza){
    const pizzaDiv=document.querySelector('.pizzas');
    const cardDiv=document.createElement('div');
    cardDiv.classList.add('col-4','card');
    const Productimage=document.createElement('img');
    Productimage.setAttribute('src',pizza.url);
    Productimage.classList.add('card-img-top');
    cardDiv.appendChild(Productimage);
    const cardBody=document.createElement('div');
    cardDiv.classList.add('card-body');
    cardDiv.appendChild(cardBody);
    const cardHead=document.createElement('h5');
    cardHead.classList.add('card-title');
    cardHead.innerText=pizza.name;
    cardBody.appendChild(cardHead);
    const cardP=document.createElement('p');
    cardP.classList.add('card-text');
    cardP.innerText=pizza.desc;
    cardBody.appendChild(cardP);
    const cardButton=document.createElement('a');
    cardButton.classList.add('btn','btn-primary');
    cardButton.setAttribute('product_id',pizza.id);
    cardButton.addEventListener('click',addToCart);
    cardButton.innerText='Add To Cart';
    cardBody.appendChild(cardButton);
    pizzaDiv.appendChild(cardDiv);
}