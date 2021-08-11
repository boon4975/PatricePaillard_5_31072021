
// a mettre sur index.js


async function getAll() {
    let allProducts = sessionStorage.getItem('allProducts');
    if(allProducts == null){
        const allProducts = [];
        const respteddies = await fetch('http://localhost:3000/api/teddies');
        const allTeddies = await respteddies.json();
        allProducts.push(allTeddies);

        const respcameras = await fetch('http://localhost:3000/api/cameras');
        const allCameras = await respcameras.json();
        allProducts.push(allCameras);

        const respfurniture = await fetch('http://localhost:3000/api/furniture');
        const allFurniture = await respfurniture.json();
        allProducts.push(allFurniture);

        sessionStorage.setItem('allProducts', JSON.stringify(allProducts));
    }
}
getAll();
/*
async function getAllTeddies() {
    let allTeddies = sessionStorage.getItem('allTeddies');
    if(allTeddies == null){
        const response = await fetch('http://localhost:3000/api/teddies');
        const allTeddies = await response.json();
        sessionStorage.setItem('allTeddies', JSON.stringify(allTeddies));
    }
    viewAllProducts(JSON.parse(sessionStorage.getItem('allTeddies')));
}

getAllTeddies();

async function getAllCameras() {
    let allCameras = sessionStorage.getItem('allCameras');
    if(allCameras == null){
        const response = await fetch('http://localhost:3000/api/cameras');
        const allCameras = await response.json();
        sessionStorage.setItem('allCameras', JSON.stringify(allCameras));
    }
    viewAllProducts(JSON.parse(sessionStorage.getItem('allCameras')));
}

getAllCameras();


async function getAllFurniture() {
    let allFurniture = sessionStorage.getItem('allFurniture');
    if(allFurniture == null){
        const response = await fetch('http://localhost:3000/api/furniture');
        const allFurniture = await response.json();
        sessionStorage.setItem('allFurniture', JSON.stringify(allFurniture));
    }
    viewAllProducts(JSON.parse(sessionStorage.getItem('allFurniture')));
}

getAllFurniture();
*/

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


contact.push({"firstName": firstName});
    contact.push({"lastName": lastName});
    contact.push({"address": address});
    contact.push({"city": city});
    contact.push({"email": email});

    contact.push({
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "city": city,
        "email": email
    })
    
// fn avant inclusion fetch
    function getDataContact(){
        let cart = initCart();
        let products = [searchIdsCart(cart)]; 
        let contact = [];
        firstName = document.forms['contact'].firstName.value;
        lastName = document.forms['contact'].lastName.value;
        address = document.forms['contact'].address.value;
        city = document.forms['contact'].city.value;
        email = document.forms['contact'].email.value;
        
        initOrder();
        let order = [];
        order.push({
            "contact": {
                "firstName": firstName,
                "lastName": lastName,
                "address": address,
                "city": city,
                "email": email
                },
            "products" : products
        });
    
        saveOrder(order);
        window.location.href="confirmation.html";
    }