var niveauNormal = [
	"adrenaline",
	"asterisque",
	"aspirateur",
	"bijouterie",
	"capricorne",
	"ephemeride",
	"zigzag",
	"hierarchie",
	"viking",
	"laborantin",
	"marguerite",
	"omnipotent",
	"onomatopee",
	"volley",
	"exquis",
	"referendum",
	"revolution",
	"shampooing",
	"chakra",
	"tramontane",
	"unifilaire",
	"silhouette",
	"boyaux",
	"hypnose",
	"mappemonde"
]

var niveauDifficile = [
	"groggy",
	"autochtone",
	"backgammon",
	"bastringue",
	"bouddhiste",
	"kephyr",
	"intoxiquer",
	"kidnapping",
	"marivauder",
	"marsupiale",
	"navigateur",
	"noctambule",
	"sphynx",
	"pentathlon",
	"sciatiques",
	"scarlatine",
	"tortillard",
	"trapeziste",
	"velocipede",
	"xenophilie",
	"pickpocket",
	"kazakh",
	"ostracisme",
	"jockey",
	"whisky"
]
var btn1 = document.getElementById("bouton1");
var essai = document.getElementById("essai");
var motADecouvrir = document.getElementById("motADecouvrir");
var lettreContenu = document.getElementById("lettre-contenue");
var msgVictoire = document.getElementById("msg-victoire");
var msgDefaite = document.getElementById("msg-defaite");
var zoneSaisi = document.getElementById("mot-a-trouver");
var btnNormal = document.getElementById("level-normal");
var btnDifficile = document.getElementById("level-hard");
var zoneNiveau = document.getElementById("select-niveau");


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

zoneSaisi.addEventListener("keydown", function(e) 
{
	if (e.key==="Enter") 
	{ 
		btn1.click();
	}
})

function motNormal()
{
    index = Math.floor(Math.random() * 26);
    motCache = niveauNormal[index];
    console.log(motCache);

    crypterMot();
}

function motDifficile()
{
    index = Math.floor(Math.random() * 26);
    motCache = niveauDifficile[index];
    console.log(motCache);

    crypterMot();
}

function crypterMot()
{
    zoneNiveau.style.display = "none";
    btn1.style.visibility = "visible"
	zoneSaisi.placeholder = "Saisir une lettre";
    zoneSaisi.disabled = false;


    
    longueur = motCache.length;
    essaisRestants = 10;		
    essai.innerHTML = "Vous avez droit à : " + essaisRestants + " essais.";

    for (j = 0; j < longueur; j++) 
		{
			motCrypte += "*";
		}

		motDecouvert = motCrypte;	

		motADecouvrir.innerHTML = "Mot découvert : " + motCrypte;
        
}

function jouer() 
{	
    saisieJoueur2 = document.getElementById("mot-a-trouver").value

	if (motCache != motDecouvert && essaisRestants > -1) 
	{
		essai.innerHTML = "Vous avez droit à : " + essaisRestants + " essais.";
		
		motADecouvrir.innerHTML = "Mot découvert : " + motCrypte;	
		
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
					motRestant = motDecouvert.substring(0, i) + saisieJoueur2 + motDecouvert.substring(i+1, longueur);
					motDecouvert = motRestant;
					lettreTrouvee++;
				}
			}
		} 
		else 
		{
			midstring = " ne contient pas ";
            essaisRestants --;
		}	
		motADecouvrir.innerHTML = motDecouvert;
		lettreContenu.innerHTML = "Le mot à découvrir" + midstring + "la lettre " + saisieJoueur2;
	}

	//Afficher msg de victoire ou de défaite//
	if (motCache == motDecouvert) 
	{
		msgVictoire.innerHTML = "Félicitation champion ! Tu as gagné en : " + tentative + " tentatives !";

	}
	else if (essaisRestants == 0)
	{
		msgDefaite.innerHTML = "Perdu, le mot était : " + motCache + ". Tu as trouvé : " + lettreTrouvee + " lettres !";
		
	}
	document.getElementById("mot-a-trouver").value = "";
}
	//End Afficher msg de victoire ou de défaite//



///Start Pendu Solo///
btnNormal.addEventListener("click", motNormal);
btnDifficile.addEventListener("click", motDifficile);
btn1.addEventListener("click", jouer);