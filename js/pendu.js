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

// vérifier s'il n'y a aps de caractère spéciaux ou de chiffres)
var allowed = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function checkAllowed(value)
	{
		for (var compteur = 0; compteur <= allowed.length; compteur++)
			{
				var resultatCheck = value.includes(allowed[compteur]);
				if (resultatCheck === true)
					{
						var erreurDetectee = resultatCheck;
					}
				return erreurDetectee
			}

	}

/**Création du mot**/
var boutonValidation = document.getElementById('validation');

var resultat = null;

function verification()
	{
		var solution = document.getElementById('solution').value;
		solution = solution.toUpperCase();
		var taille = solution.length;
		var verificationInput = checkAllowed(solution);
		if (verificationInput === false)
			{
				reinitialisation();
				alert('Il ne faut pas de chiffres ou de caractères spéciaux');

			}
		else
			{
				if (taille > 2)
					{
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
		tenteTaChance = tenteTaChance.toUpperCase();

		verificationInput = checkAllowed(tenteTaChance);
		if (verificationInput === false)
			{
				reinitialisation();
				alert('Il ne faut pas de chiffres ou de caractères spéciaux');
			}
		else
			{
				if (tenteTaChance.length != 1)
					{
						alert('Veuillez ne poster qu\'une lettre');
					}
				else
					{
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
								for (i = 0; i < positions.length; i++)
									{	//il faut utiliser la conversion unicode du chiffre pur l'utiliser dans le query selector  -> https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
										var cible = '#\\3' + positions[i];
										document.querySelector('#mot-mystere ' + cible).innerText = tenteTaChance;
									}

							}
					}

			}
	}


deviner.addEventListener('click', function ()
{
	nouvelleLettre();
});


/** TO DO :
 * bloquer accents et chiffres (ou faire tout l'alphabet en majusulet si pas dedans, alors ca bloque)
 * convertir les accents( gérer les î et tout avec charcode ?),
 * prevoir alert fin du jeu + reinitialisation. (ou pas)-
 * faire une bdd de mot ?
 *ajouter touchstart en envent en plus du clic ? (pour gestion tablette)
 * **/

