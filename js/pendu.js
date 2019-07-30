/**Global et affichage**/
var nombreTentatives = 11;
/* changer ce chiffre pour modifier le nombre de tentatives... attention les dessins ne correspondront plus*/
var tentatives = nombreTentatives;

function affichageTentatives(quantiteTentatives)
	{
		document.querySelector('#statut p span.tentatives').innerHTML = quantiteTentatives;
	}

affichageTentatives(tentatives);

function reinitialisation()
	{
		document.getElementById('enigme').style.display = "block";
		/*document.getElementById('chercher').style.display = "none";*/
		document.getElementById('solution').value = null;
		document.getElementById('tentative').value = null;
		document.querySelector('#statut div#pendu').innerHTML = null;
		document.querySelector('#proposition span').innerHTML = null;
		tentatives = nombreTentatives;
		affichageTentatives(nombreTentatives);
	}

reinitialisation();
/* on lance le jeu*/

/***Reset affichage ***/
/*On gère le clic sur reset*/
var reset = document.getElementById('reset');

reset.addEventListener('click', function ()
{
	reinitialisation();
});

/**Création du mot**/
var boutonValidation = document.getElementById('validation');

var resultat = null;
function verification()
	{
		var solution = document.getElementById('solution').value;
		var taille = solution.length;
		if (taille > 2)
			{
				/* TODO verifier que au moins 2 lettres, pas de chiffre et de caracètres speciaux convertir le mot en majuscule si tout est bon, sauvegarde dans une variable le mot à trouver */
				document.getElementById('enigme').style.display = "none";
				document.getElementById('chercher').style.display = "block";
				var arraySplit = Array.from(solution);
				for (var i = 0; i < arraySplit.length; i++)
					{
						document.querySelector('#mot-mystere').innerHTML += '<span id="' + i + '">_ </span>';
					}
				return arraySplit;
			}
		else
			{
				alert("Votre mot est trop court, il faut au moins 3 caractères");
			}
	}


boutonValidation.addEventListener('click', function ()
{
	resultat = verification();
});

/** Deviner le mot **/

/*Clic sur le bouton deviner*/
var deviner = document.getElementById('deviner');

function nouvelleLettre()
	{ 	var tenteTaChance = document.getElementById('tentative').value;
		document.querySelector('#proposition span').innerHTML += tenteTaChance +' ';
		console.log(resultat);
		tentatives = tentatives - 1;
		document.querySelector('#statut p span.tentatives').innerHTML = tentatives;
		if (tentatives > 0)
			{
				switch (tentatives)
				{
					case 10:
						document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu1.png'/>";
						break;
					case 9:
						document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu2.png'/>";
						break;
					case 8:
						document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu3.png'/>";
						break;
					case 7:
						document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu4.png'/>";
						break;
					case 6:
						document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu5.png'/>";
						break;
					case 5:
						document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu6.png'/>";
						break;
					case 4:
						document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu7.png'/>";
						break;
					case 3:
						document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu8.png'/>";
						break;
					case 2:
						document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu9.png'/>";
						break;
					case 1:
						document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu10.png'/>";
						break;
				}
			}

		else if (tentatives <= 0)
			{
				document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu11.png'/>";
				alert(' echec du jeu');
				reinitialisation();
			}
	}

deviner.addEventListener('click', function ()
{
	nouvelleLettre();
});


/** TO DO :   * parser l'array sur chatque tentattive et gerer l'affichage
 * styler le bordel-
 * limiter le champs de devinette à 1 lettre - bloquer les chiffres -
 * verifier si en js on peut empecher le navigateur d'enregistrer la saisie automatique pour le mot a fairte deviner
 *
 * **/

