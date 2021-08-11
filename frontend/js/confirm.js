let myForm = document.getElementById('form');

let formAction = myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;

    const contact = {firstName, lastName, address, city, email};
    const paramProducts = ['5beaacd41c9d440000a57d97','5beaabe91c9d440000a57d96']
    sendform(contact, paramProducts);
})

function sendform(paramContact, paramProducts){
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
            contact: paramContact,
            products: paramProducts,
        }),
    })
        .then(function(response){
            return response.json();
        })
        .then(function(dataReq){
            reqResponse = dataReq;
        })
        .catch(function(err) {
            console.log('fetch Error');
        });
}