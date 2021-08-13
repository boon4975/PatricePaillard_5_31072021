// initialise le panier dans le localStorage
function initCart() {
    let cart = localStorage.getItem("cart");
    if(cart != null){
        return JSON.parse(cart);
    }else{
        return [];
    }
}
// ajout d'un article au panier
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
    if(position != null){ //quantité modifiée si le produit est déjà au panier
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
// enregistre le panier dans le localStorage
function saveToCart(dataProduitSelected) {
    localStorage.setItem("cart", JSON.stringify(dataProduitSelected));
}
// retire un article du panier
function removeFromCart(idRemoved) {
    (idRemoved.id);
    let cart = initCart();
    let idCart = searchIdsCart(cart);
    for(i = 0; i < cart.length; i++){
        let idFound = idCart.includes(idRemoved.id);
        if(idFound == true){
            var delpos = idCart.indexOf(idRemoved.id);// récupère l'index du produit a supprimer
            i = cart.length +1;
        }
    }
    if(delpos != null){
        cart.splice(delpos,1);
        saveToCart(cart);
        document.location.reload();
    }
}
// récupère le panier depuis le localStorage
function getCart(){
    let cart = localStorage.getItem("cart");
    return JSON.parse(cart);
}

// compte et affiche le nombre d'article au panier
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
// retoune la liste des Id Teddies uniquement pour la req POST
function searchTeddiesInCart(cart){
    let idCart = [];
    for(i = 0;i < cart.length; i++){
        if(cart[i].categorie == 'teddies'){
            idCart.push(cart[i]._id);
        }
    }
    return idCart;
}

// enregistre la commande dans le sessionStorage
function saveOrder(order){
    sessionStorage.setItem("order", JSON.stringify(order));
}
// initialise la commande dans le sessionStorage
function initOrder() {
    let order = sessionStorage.getItem("order");
    if(order != null){
        sessionStorage.removeItem("order");
    }
}
//récupère le contenu de la commande
function getOrder() {
    let order = sessionStorage.getItem("order");
    return JSON.parse(order);
}
// récupère les infos du formulaire de contact et la date
function getFormContact(){
    firstName = document.forms['contact'].firstName.value;
    lastName = document.forms['contact'].lastName.value;
    address = document.forms['contact'].address.value;
    city = document.forms['contact'].city.value;
    email = document.forms['contact'].email.value;
    let contact = {firstName, lastName, address, city,email};  // variable pour le POST
    initOrder();
    let order = [];
    order.push({
        "contact": {
            "firstName": document.forms['contact'].firstName.value,
            "lastName": document.forms['contact'].lastName.value,
            "address": document.forms['contact'].address.value,
            "city": document.forms['contact'].city.value,
            "email": document.forms['contact'].email.value
            }
    });
    dateOrder = new Date();
    order.push({"date": dateOrder});
    saveOrder(order);
    return contact;
}
//récupère les id produit pour la req POST
async function getCartProductsId(){
    let cart = initCart();
    let listProductsId = searchTeddiesInCart(cart); // variable pour le POST
    let order = await getOrder();
    order.push({
        "products" : cart
    });
    saveOrder(order);
    return listProductsId;
}

// récupère l'ordre ID de la commande
function getOrderID(postdata){
    orderId = postdata.orderId;
    order = getOrder();
    order.push({"orderId": orderId});
    saveOrder(order);
}
