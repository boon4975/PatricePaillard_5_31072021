// Liste des catégories de produits
const listCategoryProducts = ['teddies', 'cameras', 'furniture'];



// Req API GET pour chaque catégorie de produit ou pour un id.produit
function getProductsByType(typeProducts) {
    let urlApi = `http://localhost:3000/api/${typeProducts}`;
    fetch(urlApi)
        .then((res) =>{
            if (res) {
                return res.json();
            }
        })
        .then(function(dataProduct){
            let idSearched = getIdInSearchBar();
            if(idSearched == ""){
              viewAllProducts(dataProduct);   
            }else{
                let dataProductSelected = searchProductId(dataProduct, idSearched);
                if(dataProductSelected != null){
                    viewProduct(dataProductSelected, typeProducts);
                }
            };
        })
        .catch((e) => {
            console.log('erreur log' + e);
        })        
};
// req API POST - TEDDIES
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
            console.log('erreur log' + e) 
         });
    return postdata
}
// récupération ID dans la barre de navigation
function getIdInSearchBar() {
    let idUri = window.location.search;
    let idSearched = idUri.substring(4,idUri.length);
    return idSearched;
};
// recherche d'un produit par son ID
function searchProductId(dataProduct, idSearched) {
    for (let i = 0; i < dataProduct.length; i++) {
        let idFound = dataProduct[i]._id.includes(idSearched);
        if(idFound == true){
            return dataProduct[i];
        }
    };
}
// calcul sous-total de chaque article au panier
function subtotal(cart) {
    let price = cart.price;
    let qty = cart.qty;
    let totalProduct = price * parseInt(qty);
    return totalProduct;
};

// recupérer la saisie de la quantité au click
function getQtyOnClick(dataProductSelected) {
    document.getElementById('qty').addEventListener('input', function(e){
        enableAddToCart(true);
        return dataProductSelected.qty = e.target.value;
    })
}
// event activation de "ajout au panier"
function enableAddToCart(){
    document.getElementById("order").removeAttribute("disabled");
}
// event affichage du formulaire de contact
function contactEnable(){
    document.getElementById("contact").classList.remove("d-none");
}
// format de date Fr
function dateFormatFR(date){
    let timestamp = Date.parse(date);
    let dateOrder = new Date(timestamp);
    return dateOrder.toLocaleDateString();
}
// envoi du formulaire vers la page de confirmation de commande
async function submitFormContact(){
    let contact = await getFormContact();
    let listProductsId = await getCartProductsId();
    let postdata = await postTeddies(contact, listProductsId);
    getOrderID(postdata);
    window.location.href="confirmation.html";
 }
 // format prix en Euros
 function priceToEuro(price){
    let priceEuro = (price / 100).toFixed(2) + ' €';
    return priceEuro;
 }