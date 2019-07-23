/**Global et affichage**/
var nombreTentatives = 12;
/* changer ce chiffre pour modifier le nombre de tentatives... attention les dessins ne correspondront plus*/
var tentatives = nombreTentatives;

function affichageTentatives(quantiteTentatives) {
    document.querySelector('#statut p span.tentatives').innerHTML = quantiteTentatives;
}
affichageTentatives(tentatives);

function reinitialisation() {
    document.getElementById('enigme').style.display = "block";
    /*document.getElementById('chercher').style.display = "none";*/
    document.getElementById('solution').value = null;
    tentatives = nombreTentatives;
    affichageTentatives(nombreTentatives);
}
reinitialisation();
/* on lance le jeu*/

/***Reset affichage ***/
/*On gère le clic sur reset*/
var reset = document.getElementById('reset');
var resetGame = function () {
    reinitialisation();
};
reset.addEventListener('click', resetGame);


/**Création du mot**/
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
};
boutonValidation.addEventListener('click', textValidation);

/** Deviner le mot **/

/*Clic sur le bouton deviner*/
var deviner = document.getElementById('deviner');
var nouvelleLettre = function ()
{
    tentatives = tentatives - 1;
    document.querySelector('#statut p span.tentatives').innerHTML = tentatives;
    if (tentatives > 0)
    {
        switch (tentatives)
        {
            case 11:
                console.log('toto11');
                break;
            case 10:
                console.log('totot10');
                break;
        }
    }

    else if (tentatives <= 0)
    {
        alert(' echec du jeu');
        reinitialisation();
    }
};
deviner.addEventListener('click', nouvelleLettre);


/** TO DO :  finir le switch, limiter le champs de devinette à 1 lettre - bloquer les chiffres - convertir mo a trouver en array - parser l'array sur chatque tentattive et gerer l'affichage
 *
 * **/

