
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