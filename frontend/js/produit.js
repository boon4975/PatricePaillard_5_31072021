// récupère la categorie et l'id produit dans l'URL de la page produit
function paramURL() {
    let urlSearch = window.location.search;
    let params = new URLSearchParams(urlSearch);
    paramProduct = params.getAll('topic');
    if(paramProduct.length == 0 ){
        console.log('erreur dans syntaxe URL');
        window.location.href='index.html';
    }else{
        return  paramProduct;
    }
}
let params = paramURL();
if(typeof params[1] == 'undefined'){
    getProductsByType(params[0]);
}else{
    viewProduct(params);
}


countArticle();