// Liste des catégories de produits
const listCategoriesProduits = ['teddies', 'cameras', 'furniture'];
// Liste des champs requis du formulaire
const fieldRequired = ['firstName', 'lastName', 'address', 'city', 'email']

// Req API GET pour chaque catégorie de produit ou pour un id.produit
function getProduitsParType(typeProduits) {
    let urlApi = `http://localhost:3000/api/${typeProduits}`;
    fetch(urlApi)
        .then((res) =>{
            if (res) {
                return res.json();
            }
        })
        .then(function(dataProduit){
            let idRecherche = getIdInSearchBar();
            if(idRecherche == ""){
              viewAllProducts(dataProduit);   
            }else{
                let dataProduitSelected = searchProductId(dataProduit, idRecherche);
                if(dataProduitSelected != null){
                    viewProduct(dataProduitSelected, typeProduits);
                }
            };
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
            alert('Error log' + e) 
         });
    return postdata
}
// récupération ID dans la barre de navigation
function getIdInSearchBar() {
    let idDansUri = window.location.search;
    let idRecherche = idDansUri.substring(4,idDansUri.length);
    return idRecherche;
};
// recherche d'un produit par son ID
function searchProductId(dataProduit, idRecherche) {
    for (let i = 0; i < dataProduit.length; i++) {
        let idFound = dataProduit[i]._id.includes(idRecherche);
        if(idFound == true){
            return dataProduit[i];
        }
    };
}
// calcul sous-total de chaque article au panier
function sousTotal(cart) {
    let prix = cart.price;
    let qty = cart.qty;
    let totalProduit = prix * parseInt(qty);
    return totalProduit;
};

// recupérer la saisie de la quantité au click
function getQtyOnClick(dataProduitSelected) {
    document.getElementById('qty').addEventListener('input', function(e){
        submitEnable(true);
        return dataProduitSelected.qty = e.target.value;
    })
}
// event activation de "ajout au panier"
function submitEnable(enable){
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