viewPanier();
document.getElementById('firstName').addEventListener('focusin', function(){
    document.getElementById('firstName').classList.add('anim__headshake');
});
document.getElementById('lastName').addEventListener('focusin', function(){
    document.getElementById('lastName').classList.add('anim__headshake');
});
document.getElementById('adress').addEventListener('focusin', function(){
    document.getElementById('adress').classList.add('anim__headshake');
});
document.getElementById('city').addEventListener('focusin', function(){
    document.getElementById('city').classList.add('anim__headshake');
});
document.getElementById('email').addEventListener('focusin', function(){
    document.getElementById('email').classList.add('anim__headshake');
});
countArticle();