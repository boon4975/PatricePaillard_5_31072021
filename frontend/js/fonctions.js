// Variable contenant la liste des catégories de produits
const listCategoriesProduits = ['teddies', 'cameras', 'furniture'];

// fonction de création du HTML pour chaque type de produit disponible (index.html)
function affichageProduits(dataProduit) {
    for (let i = 0; i < dataProduit.length; i++) {
        let prixEuro = (dataProduit[i].price / 100).toFixed(2) + ' €';
        document.querySelector("#main").innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 card my-3 shadow">
            <div class="cadreImage cadreImage--lg"><img src="${dataProduit[i].imageUrl}" alt="photo ourson ${dataProduit[i].name}" class="card-img-top" /></div>
            <div class="card-body">
                <h2 class="card-title text-center" id="name">${dataProduit[i].name}</h2>
                <div class="card-subtitle bg-light my-3 text-center">${prixEuro}</div>
                <div class="card-text my-3">Lorem ipsum dolor sit amet.</div>
                <a href="produit.html?id=${dataProduit[i]._id}" rel="nofollow"><button id="${dataProduit[i]._id}" class="btn btn-secondary w-100">détails</button></a>
                <form method="get" action="panier.html">
                </form>
            </div>   
        </div>`;  
    };
}

// fonction de création du HTML pour un produit sélectionné (produit.html)
function affichageProduit(dataProduitSelected) {
    let prixEuro = (dataProduitSelected.price / 100).toFixed(2) + ' €';
    document.querySelector("#main").innerHTML += `
        <div class="col-0 col-md-3"></div>    
        <div class="col-12 col-md-6 card my-3 shadow">
            <div class="cadreImage cadreImage--lg"><img src="${dataProduitSelected.imageUrl}" alt="photo ourson ${dataProduitSelected.name}" class="card-img-top" /></div>
            <div class="card-body">
                <h2 class="card-title text-center" id="name">${dataProduitSelected.name}</h2>
                <div class="card-subtitle bg-light my-3 text-center">${prixEuro}</div>
                <div class="card-text my-3">Lorem ipsum dolor sit amet.</div>
                <a href="produit.html?id=${dataProduitSelected._id}" rel="nofollow"><button id="${dataProduitSelected._id}" class="btn btn-secondary w-100">détails</button></a>
                <form method="get" action="panier.html" id="form">
                </form>
            </div>   
        </div>
        <div class="col-0 col-md-3"></div>`;
    document.querySelector("#form").innerHTML = `
        <div class="form-group p-1">
            <select name="colors" id="colors" class="form-control">
                <option>Choisissez la couleur de votre ours</option>
            </select>
            <div class="form-group p-1">
                <label for="qty">Quantité : </label>
                <input type="number" min="0" name="qty" id="qty" class="form-control" />
            </div>
            <div class="form-group p-1">
                <input type="button" value="Ajouter au panier" name="Order" id="order" class="form-control btn btn-secondary" />
            </div>
        </div>`;
    for(let opt = 0; opt < dataProduitSelected.colors.length; opt++){
        document.querySelector("#colors").innerHTML += `
            <option value="${dataProduitSelected.colors[opt]}">${dataProduitSelected.colors[opt]}
            </option> `;
    };                       
};

function getProduitsParType(typeProduits) {
    let urlApi = `http://localhost:3000/api/${typeProduits}`;
    fetch(urlApi)
        .then(function(res){
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(dataProduit){
            if (typeof idRecherche == "undefined"){
                affichageProduits(dataProduit);
            }else{
                alert(idRecherche);
            }
            
        })
};

function getIdProduit() {
    let idDansUri = window.location.search;
    let idRecherche = idDansUri.substring(4,idDansUri.length);
    return idRecherche;
};
