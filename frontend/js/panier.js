viewPanier();

document.querySelector('form input[type="button"]').addEventListener('click', function(){
    var valid = true;
    for(let input of document.querySelectorAll('input')){
        valid &= input.reportValidity();
        if(!valid){
            break;
        }
    }
        if(valid){
            alert('Votre comannde a bien été validé');
            submitFormContact();
        }
});

document.getElementById('firstName').addEventListener('focusin', function(){
    document.getElementById('firstName').classList.add('anim__headshake');
});
document.getElementById('lastName').addEventListener('focusin', function(){
    document.getElementById('lastName').classList.add('anim__headshake');
});
document.getElementById('address').addEventListener('focusin', function(){
    document.getElementById('address').classList.add('anim__headshake');
});
document.getElementById('city').addEventListener('focusin', function(){
    document.getElementById('city').classList.add('anim__headshake');
});
document.getElementById('email').addEventListener('focusin', function(){
    document.getElementById('email').classList.add('anim__headshake');
});


countArticle();