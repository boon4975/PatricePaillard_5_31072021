// création du HTML pour chaque type de produit disponible (index.html)
function viewAllProducts(dataProduct, categorie) {
    for (let i = 0; i < dataProduct.length; i++) {
        let priceEuro = priceToEuro(dataProduct[i].price);
        document.querySelector("#main").innerHTML += `
                                                    <div class="col-12 col-md-6 col-lg-4 card my-3 shadow">
                                                        <div class="cadreImage cadreImage--lg"><img src="${dataProduct[i].imageUrl}" alt="${dataProduct[i].name}" class="card-img-top" /></div>
                                                        <div class="card-body">
                                                            <h2 class="card-title text-center" id="name">${dataProduct[i].name}</h2>
                                                            <div class="card-subtitle bg-light my-3 text-center">${priceEuro}</div>
                                                            <div class="card-text my-3">${dataProduct[i].name}<br/>${dataProduct[i].description}</div>
                                                            <a href="produit.html?params&topic=${categorie}&topic=${dataProduct[i]._id}" rel="nofollow"><button id="${dataProduct[i]._id}" class="btn btn-secondary w-100">détails</button></a>
                                                            <form method="get" action="panier.html">
                                                            </form>
                                                        </div>   
                                                    </div>`;  
    };
};
// création du HTML pour un produit sélectionné (produit.html)
async function viewProduct(params) {
    let dataProductSelected = await getProductById(params);
    if(typeof dataProductSelected == "undefined"){
        alert('Produit non référencé');
        window.location.href="index.html";
    }else{
        let categorie = params[0];
        let option =[];
        if(categorie == 'teddies'){
            option = option.concat(dataProductSelected.colors);
        }else if(categorie == 'furniture'){
            option = option.concat(dataProductSelected.varnish);
        }else if(categorie == 'cameras'){
            option = option.concat(dataProductSelected.lenses);
        };
        dataProductSelected.categorie = categorie;
        let priceEuro = priceToEuro(dataProductSelected.price);
        document.querySelector("#main").innerHTML += `
                                                    <div class="col-0 col-md-3"></div>    
                                                    <div class="col-12 col-md-6 card my-3 shadow">
                                                        <div class="row">
                                                            <div class="col-0 col-md-2"></div>
                                                            <div class="col-12 col-md-8 cadreImage cadreImage--lg">
                                                                <img src="${dataProductSelected.imageUrl}" alt="photo ourson ${dataProductSelected.name}" class="card-img-top" />
                                                            </div>
                                                            <div class="col-0 col-md-2"></div>
                                                        </div>
                                                        <div class="card-body">
                                                            <h2 class="card-title text-center" id="name">${dataProductSelected.name}</h2>
                                                            <div class="card-subtitle bg-light my-3 text-center">${priceEuro}</div>
                                                            <div class="card-text my-3">${dataProductSelected.description}</div>
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
            addToCart(dataProductSelected, params[1]);
        });
        getQtyOnClick(dataProductSelected);
    }
};
// création du HTML pour le panier
function viewPanier(){
    let cart = initCart();
    let totalCart = 0;
    //boucle sur le panier
    for(i = 0; i < cart.length; i++){
       let priceEuro = priceToEuro(cart[i].price);
       subtotalProduct = subtotal(cart[i]);
       subtotalProductEuro = (subtotal(cart[i]) / 100).toFixed(2) + ' €';
       document.querySelector("#main").innerHTML += `
                                                    <tr>
                                                        <td class="miniature">
                                                            <div class="cadreImage cadreImage--xs my-1">
                                                                <img src="${cart[i].imageUrl}" alt="miniature ours 1" />
                                                            </div>
                                                        </td>
                                                        <td colspan="2">${cart[i].name}</td>
                                                        <td>${cart[i].qty}</td>
                                                        <td>${priceEuro}</td>
                                                        <td>${subtotalProductEuro}</td>
                                                        <td class="delete"><i id="${cart[i]._id}" class="far fa-trash-alt" onclick="removeFromCart(this)"></i></td>
                                                    </tr>
                                                `;
    totalCart += subtotalProduct; 
    }
    totalCartEuro = (totalCart / 100).toFixed(2) + ' €';
    document.querySelector("#total").innerHTML += `
        ${totalCartEuro}
    `;    
};
function viewConfirmation() {
    let order = getOrder();
    let cart = getCart();
    let totalCart = 0;
    let dateOrder = dateFormatFR(order[1].date);
    document.querySelector("#main").innerHTML += `
                                                <h3 class="card-title text-center">Merci pour votre commande</h3>
                                                <div class="card-text row ms-0 mb-3">Bonjour ${order[0].contact.firstName.toUpperCase()} ${order[0].contact.lastName.toUpperCase()},<br/>
                                                    Pour information, nous avons reçu votre commande<p class="fw-bold m-0"> n° ${order[3].orderId}</p> en date du ${dateOrder}, elle est maintenant en cours de traitement :</div>
                                                    <div class="row ms-md-1  table-responsive-sm" id="tab">
                                                        <table class="table table-striped table-sm">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Produit</th>
                                                                    <th scope="col">P.U.</th>
                                                                    <th scope="col">Quantité</th>
                                                                    <th scope="col" >Prix</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="list_produit">`
    for(let i = 0; i < cart.length; i++){
        let priceEuro = priceToEuro(cart[i].price);
        subtotalProduct = subtotal(cart[i]);
        subtotalProductEuro = priceToEuro(subtotal(cart[i]));             
        document.querySelector("#list_produit").innerHTML += `
                                                                <tr scope="row">
                                                                    <td>${cart[i].name}</td>
                                                                    <td>${priceEuro}</td>
                                                                    <td>${cart[i].qty}</td>
                                                                    <td>${subtotalProductEuro}</td>
                                                                </tr>`;
        totalCart += subtotalProduct;
    }
    totalCartEuro = (totalCart / 100).toFixed(2) + ' €';
    document.querySelector("#list_produit").innerHTML += `
                                                                <tr scope="row">
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>Total</td>
                                                                    <td id="total">${totalCartEuro} </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>`
    document.querySelector('#tab').innerHTML +=`
                                                        <table class="table">
                                                            <thead>
                                                                <th>Adresse de facturation</th>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        ${order[0].contact.firstName.toUpperCase()} ${order[0].contact.lastName.toUpperCase()}<br/>
                                                                        ${order[0].contact.address}<br/>
                                                                        ${order[0].contact.city}<br/>
                                                                        ${order[0].contact.email}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                `
}
