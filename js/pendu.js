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
		document.getElementById('chercher').style.display = "none";
		document.getElementById('solution').value = null;
		document.getElementById('tentative').value = null;
		document.querySelector('#statut div#pendu').innerHTML = null;
		document.querySelector('#proposition span').innerHTML = null;
		document.querySelector('#mot-mystere').innerHTML = null;
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
	{
		var tenteTaChance = document.getElementById('tentative').value;

		//https://stackoverflow.com/questions/9690429/get-multiple-character-positions-in-array
		var getAllIndexesOf = function (str, toFind)
			{
				var all = [];
				for (var i = 0; i < str.length; i++)
					{
						if (toFind.indexOf(str[i]) >= 0)
							{
								all.push(i);
							}
					}
				return all;
			};

		var positions = getAllIndexesOf(resultat, tenteTaChance);
		//console.log(positions);
		if (positions.length < 1 || positions == undefined)
			{
				document.querySelector('#proposition span').innerHTML += tenteTaChance + ' ';
				tentatives = tentatives - 1;
				document.querySelector('#statut p span.tentatives').innerHTML = tentatives;
				if (tentatives > 0)
					{
						switch (tentatives)
						{
							case 10:
								document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu1.png' width='75%'/>";
								break;
							case 9:
								document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu2.png' width='75%'/>";
								break;
							case 8:
								document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu3.png' width='75%'/>";
								break;
							case 7:
								document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu4.png' width='75%'/>";
								break;
							case 6:
								document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu5.png' width='75%'/>";
								break;
							case 5:
								document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu6.png' width='75%'/>";
								break;
							case 4:
								document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu7.png' width='75%'/>";
								break;
							case 3:
								document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu8.png' width='75%'/>";
								break;
							case 2:
								document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu9.png' width='75%'/>";
								break;
							case 1:
								document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu10.png' width='75%'/>";
								break;
						}
					}

				else if (tentatives <= 0)
					{
						document.querySelector('#statut div#pendu').innerHTML = "<img src='./pendu-image/pendu11.png' width='75%'/>";
						alert('échec du jeu');
						reinitialisation();
					}
			}
		else if (positions.length >= 0)
			{
				for (i = 0 ; i < positions.length; i++)
					{	//il faut utiliser la conversion unicode du chiffre pur l'utiliser dans le query selector  -> https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
						var cible = '#\\3' + positions[i];
						document.querySelector('#mot-mystere ' +cible).innerText = tenteTaChance;
					}

			}


	}

deviner.addEventListener('click', function ()
{
	nouvelleLettre();
});


/** TO DO :
 * limiter le champs de devinette à 1 lettre - bloquer les chiffres et convertir les accents, tout mettre en majuscule,
 * prevoir alert fin du jeu + reinitialisation. (ou pas)-
 *ajouter touchstart en envent en plus du clic ? (pour gestion tablette)
 * **/

