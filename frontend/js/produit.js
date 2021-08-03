

fetch('http://localhost:3000/api/teddies')
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(dataProduit){
        let idRecherche = getIdProduit();
        for (let i = 0; i < dataProduit.length; i++) {
            let idFound = dataProduit[i]._id.includes(idRecherche);
            if(idFound == true){
                let dataProduitSelected = dataProduit[i];
                affichageProduit(dataProduitSelected);
                break;
            }
        };
    })
