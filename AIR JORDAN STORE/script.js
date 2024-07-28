//cart-----------------------------------------------------------------------
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closecart = document.querySelector("#close-cart");
//open cart-----------------------------------------------------------
cartIcon.onclick = () => {
    cart.classList.add("active");
};
//close cart---------------------------------------------------------------
closecart.onclick = () => {
    cart.classList.remove("active");
};

if(document.readyState =="loading"){
    document.addEventListener("DOMContentLoaded",ready);

} else{
    ready();
}

// Making Function------------------------------------------------------------------ 
function ready(){
// Remove Items Form Cart-------------------------------------------
    var removecartButtons = document.getElementsByClassName("cart-remove");
    console.log(removecartButtons);
    for(var i = 0; i< removecartButtons.length; i++){
        var button = removecartButtons[i];
        button.addEventListener('click' ,removeCartItem );
    }
    var quantityInputs=document.getElementsByClassName("cart-quantity");
    for(var i = 0; i< quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change" , quantityChanged);
    }
//Add To Cart--------------------------------------------------------
    var addCart=document.getElementsByClassName("add-cart");
    for(var i = 0; i< addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
// Buy Button Work     
document.getElementsByClassName("btn-buy")[0].addEventListener("click" , buyButtonClicked);   
}

// Buy Button
function buyButtonClicked(){
    alert("Your Order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    } 
    updatetotal();  
}
//remove Items From Cart-----------------------------------------------
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
//quantity changes-------------------------------------------------------
function quantityChanged(event){
    var input=  event.target;
    if (isNaN(input.value) || input.value <=0){
        input.value = 1;
    }
    updatetotal();
} 
function addCartClicked(event){
    var button=  event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product_img")[0].src;
    addProductToCart(title,price,productImg);
    console.log(title,price,productImg);
    updatetotal();
}
// add Product To Cart--------------------------------------------------------------
function addProductToCart(title, price, productImg){
    var cartShopBox=document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var CartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = CartItems.getElementsByClassName("cart-product-title");
    for(var i = 0; i< cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("You have already add this item to cart");
            return;
        }
        
    }
    
 var cartBoxcontent =`
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                       </div>
                       <!--remove cart-->
                       <i class='bx bxs-trash-alt cart-remove' ></i>`
 cartShopBox.innerHTML =cartBoxcontent;
 CartItems.append(cartShopBox);
 cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);                        
 cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantityChanged);
}
     
//update total------------------------------------------------------------ 
function updatetotal(){
    var cartContent=document.getElementsByClassName("cart-content")[0];
    var cartBoxes=cartContent.getElementsByClassName("cart-box");
    var total=0;
    for(var i = 0; i< cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + price * quantity;   
    }
    // if price contain some cents value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}