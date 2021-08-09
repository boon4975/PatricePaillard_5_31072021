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
    let idCart = searchIdsCart(cart);
    for(i = 0; i < cart.length; i++){
        let idFound = idCart.includes(idRecherche);
        if(idFound == true){
            var position = idCart.indexOf(idRecherche);// récupère l'index du produit dans la liste des id au panier
            i = cart.length +1;
        }
    }
    if(position != null){ //modification seulement de la quantité
        let qty = parseInt(cart[position].qty);
        let newqty = qty + parseInt(dataProduitSelected.qty);
        cart[position].qty = newqty;
        saveToCart(cart);
        countArticle();
    }else{
        cart.push(dataProduitSelected);
        saveToCart(cart);
        countArticle();
    }    
}

function saveToCart(dataProduitSelected) {
    localStorage.setItem("cart", JSON.stringify(dataProduitSelected));
}

// compte le nombre d'article au panier
function countArticle() {
    let article = initCart();
    if(article.length > 0) {
        let countArticle = document.querySelector("#countarticle");
        countArticle.innerHTML = article.length;
        countArticle.classList.remove("d-none");
    }
}

// liste des id produit dans le panier
function searchIdsCart(cart){
    let idCart = [];
    for(i = 0;i < cart.length; i++){
        idCart.push(cart[i]._id);
    }
    return idCart;
}