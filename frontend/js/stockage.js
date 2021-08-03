// fonction de création du HTML pour un produit sélectionné (produit.html)
function affichageProduit(dataProduitSelected) {
  let prixEuro = (dataProduitSelected.price / 100).toFixed(2) + ' €';
  document.querySelector("#main").innerHTML += `
      <div class="col-0 col-md-3"></div>    
      <div class="col-12 col-md-6 card my-3 shadow">
          <div class="cadreImage cadreImage--lg"><img src="${dataProduitSelected.imageUrl}" alt="photo ourson ${dataProduitSelected.name}" class="card-img-top" /></div>
          <div class="card-body">
              <h2 class="card-title text-center" id="name">${dataProduitSelected.name}</h2>
              <div class="card-subtitle bg-light rounded-pill my-3 text-center">${prixEuro}</div>
              <div class="card-text my-3">Lorem ipsum dolor sit amet.</div>
              <a href="produit.html?id=${dataProduitSelected._id}" rel="nofollow"><button id="${dataProduitSelected._id}" class="btn btn-secondary w-100">détails</button></a>
              <form method="get" action="panier.html" id="form">
              </form>
          </div>   
      </div>
      <div class="col-0 col-md-3"></div>`;
  document.querySelector(form).innerHTML =+ `
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
      document.querySelector(select).innerHTML += `
          <option value="${dataProduitSelected.colors[opt]}">${dataProduitSelected.colors[opt]}</option> `;
  };                       
};

new Promise((resolve,rejec) => {
    fetch("http://localhost:3000/api/teddies")
}).then(function(res){
    if (res.ok) {
        return res.json();
    }
}).then(function(data) {
    data(JSON.stringify(JSON.parse(teddies)));
}).then(function() {
    alert(data.lenght);
});


// requete OK affiche des oursons
fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(dataProduct) {
    for (let i = 0; i < dataProduct.length; i++) {
        document.querySelector("#main").innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 card my-3 shadow">
            <div class="cadreImage cadreImage--lg"><img src="${dataProduct[i].imageUrl}" alt="photo ourson ${dataProduct[i].name}" class="card-img-top" /></div>
            <div class="card-body">
                <h2 class="card-title text-center" id="name">${dataProduct[i].name}</h2>
                <div class="card-subtitle bg-light rounded-pill my-3 text-center">Prix ${dataProduct[i].price}</div>
                <div class="card-text my-3">Lorem ipsum dolor sit amet.</div>
                <form method="get" action="panier.html">
                    <div class="form-group p-1">
                        <select name="colors" id="colors" class="form-control">
                            <option>Choisissez la couleur de votre ours</option>
                            <option value="green">Vert</option>
                            <option value="black">Noir</option>
                            <option value="red">Rouge</option>
                        </select>
                    </div>
                    <div class="form-group p-1">
                        <label for="qty">Quantité : </label>
                        <input type="number" min="0" name="qty" id="qty" class="form-control">
                    </div>
                    <div class="form-group p-1">
                        <input type="button" value="Ajouter au panier" name="Order" id="order" class="form-control btn btn-secondary">
                    </div>
                </form>
            </div>   
        </div>`;  
    };
  })
  .catch(function(err) {
    alert("Une erreur est survenue");
  })
// fin code OK

// fetch des oursons: affiche la liste des oursons sur index
// code avant création d"une fonction générale pour l'utiliser pour chacun d'un produit
fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(dataProduct) {
    for (let i = 0; i < dataProduct.length; i++) {
        document.querySelector("#main").innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 card my-3 shadow">
            <div class="cadreImage cadreImage--lg"><img src="${dataProduct[i].imageUrl}" alt="photo ourson ${dataProduct[i].name}" class="card-img-top" /></div>
            <div class="card-body">
                <h2 class="card-title text-center" id="name">${dataProduct[i].name}</h2>
                <div class="card-subtitle bg-light rounded-pill my-3 text-center">Prix ${dataProduct[i].price}</div>
                <div class="card-text my-3">Lorem ipsum dolor sit amet.</div>
                <a href="./frontend/view/produit.html?id=xxx"><button class="btn btn-secondary w-100">détails</button></a>
            </div>   
        </div>`;  
    };
  })
  .catch(function(err) {
    alert("Une erreur est survenue");
  })


  