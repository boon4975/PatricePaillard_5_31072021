// Liste des catégories de produits
const listCategoriesProduits = ['teddies', 'cameras', 'furniture'];
// Liste des champs requis du formulaire
const fieldRequired = ['firstName', 'lastName', 'adress', 'city', 'email']

// création du HTML pour chaque type de produit disponible (index.html)
function viewAllProducts(dataProduit) {
    for (let i = 0; i < dataProduit.length; i++) {
        let prixEuro = (dataProduit[i].price / 100).toFixed(2) + ' €';
        document.querySelector("#main").innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 card my-3 shadow">
            <div class="cadreImage cadreImage--lg"><img src="${dataProduit[i].imageUrl}" alt="${dataProduit[i].name}" class="card-img-top" /></div>
            <div class="card-body">
                <h2 class="card-title text-center" id="name">${dataProduit[i].name}</h2>
                <div class="card-subtitle bg-light my-3 text-center">${prixEuro}</div>
                <div class="card-text my-3">${dataProduit[i].name}<br/>${dataProduit[i].description}</div>
                <a href="produit.html?id=${dataProduit[i]._id}" rel="nofollow"><button id="${dataProduit[i]._id}" class="btn btn-secondary w-100">détails</button></a>
                <form method="get" action="panier.html">
                </form>
            </div>   
        </div>`;  
    };
};

// création du HTML pour le panier
function viewPanier(){
    let cart = initCart();
    let totalCart = 0;
    //boucle sur le panier
    for(i = 0; i < cart.length; i++){
       let prixEuro = (cart[i].price / 100).toFixed(2) + ' €';
       sousTotalProduit = sousTotal(cart[i]);
       sousTotalProduitEuro = (sousTotal(cart[i]) / 100).toFixed(2) + ' €';
       document.querySelector("#main").innerHTML += `
        <tr>
            <td class="miniature">
                <div class="cadreImage cadreImage--xs my-1">
                    <img src="${cart[i].imageUrl}" alt="miniature ours 1" />
                </div>
            </td>
            <td colspan="2">${cart[i].name}</td>
            <td>${cart[i].qty}</td>
            <td>${prixEuro}</td>
            <td>${sousTotalProduitEuro}</td>
        </tr>
    `;
    totalCart += sousTotalProduit; 
    }
    totalCartEuro = (totalCart / 100).toFixed(2) + ' €';
    document.querySelector("#total").innerHTML += `
        ${totalCartEuro}
    `;
    
};
// création du HTML pour un produit sélectionné (produit.html)
function viewProduct(dataProduitSelected) {
    let option =[];
    if(dataProduitSelected.hasOwnProperty('colors') == true){
        option = option.concat(dataProduitSelected.colors);
    }else if(dataProduitSelected.hasOwnProperty('varnish') == true){
        option = option.concat(dataProduitSelected.varnish);
    }else if(dataProduitSelected.hasOwnProperty('lenses') == true){
        option = option.concat(dataProduitSelected.lenses);
    };
    let prixEuro = (dataProduitSelected.price / 100).toFixed(2) + ' €';
    document.querySelector("#main").innerHTML += `
        <div class="col-0 col-md-3"></div>    
        <div class="col-12 col-md-6 card my-3 shadow">
            <div class="row">
                <div class="col-0 col-md-2"></div>
                <div class="col-12 col-md-8 cadreImage cadreImage--lg">
                    <img src="${dataProduitSelected.imageUrl}" alt="photo ourson ${dataProduitSelected.name}" class="card-img-top" />
                </div>
                <div class="col-0 col-md-2"></div>
            </div>
            <div class="card-body">
                <h2 class="card-title text-center" id="name">${dataProduitSelected.name}</h2>
                <div class="card-subtitle bg-light my-3 text-center">${prixEuro}</div>
                <div class="card-text my-3">${dataProduitSelected.description}</div>
                <form id="form">
                </form>
            </div>   
        </div>
        <div class="col-0 col-md-3"></div>`;
    document.querySelector("#form").innerHTML = `
        <div class="form-group p-1">
            <select name="colors" id="options" class="form-control">
                <option>Option disponible</option>
            </select>
            <div class="form-group p-1">
                <label for="qty">Quantité : </label>
                <input type="number" min="1" name="qty" id="qty" class="form-control" autofocus required/>
            </div>
            <div class="form-group p-1">
                <input type="button" value="Ajouter au panier" name="Order" id="order" class="form-control btn btn-secondary" disabled="true" data-toggle="modal" data-target="#popup"/>
            </div>
        </div>`;
    for(let opt = 0; opt < option.length; opt++){
        document.querySelector("#options").innerHTML += `
            <option value="${option[opt]}">${option[opt]}
            </option> `;
    };
    document.getElementById('order').addEventListener('click', function(){
        addToCart(dataProduitSelected);
    });
    getQtyOnClick(dataProduitSelected);
};

// Récupération des données pour chaque catégorie de produit ou pour un id.produit
function getProduitsParType(typeProduits) {
    let urlApi = `http://localhost:3000/api/${typeProduits}`;
    fetch(urlApi)
        .then(function(res){
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(dataProduit){
            let idRecherche = getIdInSearchBar();
            if(idRecherche == ""){
              viewAllProducts(dataProduit);   
            }else{
                let dataProduitSelected = searchProductId(dataProduit, idRecherche);
                viewProduct(dataProduitSelected);
                };
            })          
};
// récupération ID dans la barre de navigation
function getIdInSearchBar() {
    let idDansUri = window.location.search;
    let idRecherche = idDansUri.substring(4,idDansUri.length);
    return idRecherche;
};
// recherche d'un produit par son ID
function searchProductId(dataProduit) {
    let idRecherche = getIdInSearchBar()
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

function patternCheck(value){
    value.forEach(field => {
        if(field == 'firstName' || field == 'lastName'){
            fieldCheckText(field);
        }else if(field == 'adress' || field == 'city'){
            fieldCheckText(field);
        }else if(field == 'email'){
            fieldCheckText(field);
        }
        
    });
}

function fieldCheckText(e){
    if(/[0-9&"#'{(  )}`_\\@+=$*%!:\/;.?,°\[\]-]/.test(e.target.value)){
        alert('erreur');
    }
};