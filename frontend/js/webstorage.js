function initCart() {
    let cart = localStorage.getItem("cart");
    if(cart != null){
        return JSON.parse(cart);
    }else{
        return [];
    }
}

function addToCart(dataProduitSelected){
    let cart = initCart();
    cart.push(dataProduitSelected);
    saveToCart(cart);
}

function saveToCart(dataProduitSelected) {
    localStorage.setItem("cart", JSON.stringify(dataProduitSelected));
}

