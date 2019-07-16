/**Global**/
document.getElementById('enigme').style.display = "block";
/*document.getElementById('chercher').style.display = "none";*/


/***Reset affichage ***/
var reset = document.getElementById('reset');
var resetGame = function() {
    document.getElementById('enigme').style.display = "block";
    document.getElementById('chercher').style.display = "none";
    document.getElementById('solution').value = null;
}
reset.addEventListener('click', resetGame);


/*Création du mot*/
var boutonValidation = document.getElementById('validation');

function verification() {
    var solution = document.getElementById('solution').value;
    var taille = solution.length;
    if (taille > 2) {
        /* TODO verifier que au moins 2 lettres, pas de chiffre et de caracètres speciaux convertir le mot en majuscule si tout est bon, sauvegarde dans une variable le mot à trouver */
        document.getElementById('enigme').style.display = "none";
        document.getElementById('chercher').style.display = "block";
        return solution;

    }
    else {
        alert("Votre mot est trop court, il faut au moins 3 caractères");
    }
}

var textValidation = function () {
    var motATrouver = verification();
    console.log(motATrouver);
}
boutonValidation.addEventListener('click', textValidation);

/* Deviner le mot */
var tentatives = 12;
console.log("il reste " + tentatives + ". ");
/** TO DO : bouton diminue nombre tentative; afficher nombre tentative; chaque tentative affiche un bonhomme différent (switch case) **/