var btn1 = document.getElementById("bouton1");
var essai = document.getElementById("essai");
var motADecouvrir = document.getElementById("motADecouvrir");
var lettreContenu = document.getElementById("lettre-contenue");
var msgVictoire = document.getElementById("msg-victoire");
var msgDefaite = document.getElementById("msg-defaite");
var zoneSaisi = document.getElementById("mot-a-trouver");
var motRestant = "";
var motDecouvert = "";
var motCrypte = "";
var tentative = 0;
var lettreTrouvee = 0;
var i = 0;
var j = 0;
var longueur;
var motCache = "";
var motSaisi = "";
var essaisRestants = 0;


//Joueur 1//
function crypterMot()
{
	motSaisi = document.getElementById("mot-a-trouver").value;
	
	if(motSaisi.length > 1) 
	{
		motCache = motSaisi;
		longueur = motCache.length;
		essaisRestants = longueur * 2;		
		essai.innerHTML = "Vous avez droit à : " + essaisRestants + " essais.";



		for (j = 0; j < longueur; j++) 
		{
			motCrypte += "*";
		}

		motDecouvert = motCrypte;	

		motADecouvrir.innerHTML = "Mot découvert : " + motCrypte;

		btn1.value = "Proposez";
		zoneSaisi.placeholder = "Saisir une lettre";
		zoneSaisi.maxlength="1";

		btn1.addEventListener("click", joueur2);
	}	
	else
	{
		saisieJoueur2 = motSaisi;
		btn1.removeaddEventListener("click", crypterMot);
		btn1.addEventListener("click", joueur2);
	}
	document.getElementById("mot-a-trouver").value = "";
	zoneSaisi.addEventListener("keypress", function(e) 
	{
		if (e.key==="Enter") 
		{ 
			btn1.click();
		}
	})
}


//Joueur 2//
function joueur2() 
{	
	if (motCache != motDecouvert && essaisRestants > 0) 
	{
		essai.innerHTML = "Vous avez droit à : " + essaisRestants + " essais.";
		
		motADecouvrir.innerHTML = "Mot découvert : " + motCrypte;

	
		essaisRestants -= 1;
		tentative++;

		var midstring;
	
		//Remplacer les lettres valides//
		if (motCache.includes(saisieJoueur2)) 
		{ 
			for (i=0; i< longueur; i++) 
			{
				if (motCache.charAt(i) == saisieJoueur2)
				{
					midstring = " contient ";
					motRestant = motDecouvert.substring(0, i) + saisieJoueur2 + motDecouvert.substring(i +1, longueur);
					motDecouvert = motRestant;
					lettreTrouvee++;
				}
			}
		} 
		else 
		{
			midstring = " ne contient pas ";
		}	
		motADecouvrir.innerHTML = motDecouvert;
		lettreContenu.innerHTML = "Le mot à découvrir" + midstring + "la lettre " + saisieJoueur2;
	}

	//Afficher msg de victoire ou de défaite//
	if (motCache == motDecouvert) 
	{
		msgVictoire.innerHTML = "Félicitation champion ! Tu as gagné en : " + tentative + " tentatives !";

	}
	else 
	{
		msgDefaite = "Perdu, le mot était : " + motCache + ". Tu as trouvé : " + lettreTrouvee + " lettres !";
		
	}
	document.getElementById("mot-a-trouver").value = "";
}
	//End Afficher msg de victoire ou de défaite//



///Start Pendu///
btn1.addEventListener("click", crypterMot);

/*document.addEventListener("keydown", function(e) {	
	inputlettreTest.value = e.key;
	joueur2();
});*/

///End Pendu///
