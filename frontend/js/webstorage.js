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
    let idRecherche = getIdInSearchBar();
    for(i = 0; i < cart.length; i++){
        let idFound = cart[i]._id.includes(idRecherche);
        if(idFound == true){
            let qty = parseInt(cart[i].qty);
            let newqty = qty + parseInt(dataProduitSelected.qty);
            cart[i].qty = newqty;
            saveToCart(cart);
            break;
        }else{
            cart.push(dataProduitSelected);
            saveToCart(cart);
        }
    }
    
    
}

function saveToCart(dataProduitSelected) {
    localStorage.setItem("cart", JSON.stringify(dataProduitSelected));
}

