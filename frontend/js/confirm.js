function viewConfirmation() {
    let order = getOrder();
    let cart = getCart();
    let totalCart = 0;
    let dateOrder = dateFormatFR(order[1].date);
    document.querySelector("#main").innerHTML += `
        <h3 class="card-title text-center">Merci pour votre commande</h3>
        <div class="card-text row ms-0">Bonjour ${order[0].contact.firstName.toUpperCase()} ${order[0].contact.lastName.toUpperCase()},<br/>
            Pour information, nous avons reçu votre commande<p class="fw-bold m-0"> n° ${order[3].orderId}</p> en date du ${dateOrder}, elle est maintenant en cours de traitement :</div>
            <div class="row ms-1">
                <table>
                    <thead>
                        <tr class="text-center">
                            <th>Produit</th>
                            <th>Quantité</th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody id="list_produit">`
    for(let i = 0; i < cart.length; i++){
        let prixEuro = (cart[i].price / 100).toFixed(2) + ' €';
        sousTotalProduit = sousTotal(cart[i]);
        sousTotalProduitEuro = (sousTotal(cart[i]) / 100).toFixed(2) + ' €';             
        document.querySelector("#list_produit").innerHTML += `
                            <tr  class="text-center">
                                <td>${cart[i].name}</td>
                                <td>${cart[i].qty}</td>
                                <td>${sousTotalProduitEuro}</td>
                            </tr>
        `;
        totalCart += sousTotalProduit;
    }
    totalCartEuro = (totalCart / 100).toFixed(2) + ' €';
    document.querySelector("#list_produit").innerHTML += `
                            <tr>
                                <td colspan="2" class="text-end pe-3">Total</td>
                                <td colspan="2" id="total">${totalCartEuro} </td>
                            </tr>
                    </tbody>
                </table>
                <table>
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

function dateFormatFR(date){
    let timestamp = Date.parse(date);
    let dateOrder = new Date(timestamp);
    return dateOrder.toLocaleDateString();
}

viewConfirmation();