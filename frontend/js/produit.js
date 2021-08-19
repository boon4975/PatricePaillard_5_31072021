// récupère la categorie et l'id produit dans l'URL de la page produit
function paramURL() {
    let urlSearch = window.location.search;
    let params = new URLSearchParams(urlSearch);
    paramProduct = params.getAll('topic');
    return  paramProduct;
}
let params = paramURL();


viewProduct(params);
countArticle();