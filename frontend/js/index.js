listCategoriesProduits.forEach(value => {
  getProduitsParType(value);
});

countArticle();

//fonction de mise en forme des data avant mise au panier (localStoarge)
function formatDataProduct(dataProduitSelected, categorie){
  let data = [];
  data.push({'teddies': dataProduitSelected});
  localStorage.setItem("cartcat", JSON.stringify(data));
  alert('check data format');
  return data;
}