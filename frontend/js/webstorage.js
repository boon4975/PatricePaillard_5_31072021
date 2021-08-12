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
function getCart(){
    let cart = localStorage.getItem("cart");
    return JSON.parse(cart);
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

// manipulation de la commande dans le sessionStorage

function saveOrder(order){
    sessionStorage.setItem("order", JSON.stringify(order));
}
function initOrder() {
    let order = sessionStorage.getItem("order");
    if(order != null){
        sessionStorage.removeItem("order");
    }
}
function getOrder() {
    let order = sessionStorage.getItem("order");
    return JSON.parse(order);
}
// gestion formulaire de contact

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
async function getCartProductsId(){
    let cart = initCart();
    let listProductsId = searchIdsCart(cart); // variable pour le POST
    let order = await getOrder();
    order.push({
        "products" : cart
    });
    saveOrder(order);
    return listProductsId;
}

async function postTeddies(contact, listProductsId){
    let postdata = await fetch('http://localhost:3000/api/teddies/order',
        {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                contact: contact,
                products: listProductsId
            }),
        })
        .then(function(res){
            if(res.ok){
                return res.json();
            }
        })
        .catch((e) => {
            alert('Error log' + e) 
         });
    return postdata
}
function getOrderID(postdata){
    orderId = postdata.orderId;
    order = getOrder();
    order.push({"orderId": orderId});
    saveOrder(order);
}
async function submitFormContact(){
   let contact = await getFormContact();
   let listProductsId = await getCartProductsId();
   let postdata = await postTeddies(contact, listProductsId);
   getOrderID(postdata);
   window.location.href="confirmation.html";
}