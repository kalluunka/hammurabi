var jahr = 0;
var korn = 6000;
var buerger = 100;
var land = 400;
var saatnum = 0;
var nahrungnum = 0;
var kaufnum = 0;
var ende = false;

var landPreis = 5;
var ernteProAcker;

function spieleEineRunde(){
	if(ende == false){
		jahr = jahr + 1;
		bestimmeErnteErfolg();
		verarbeiteBefehle();
		bestimmeLandPreis();
		saatnum = 0;
		nahrungnum = 0;
		kaufnum = 0;
		erstelleBericht();
		pruefeEnde();
		}
	}
function verarbeiteBefehle(){
	
	var verteileKorn = nahrungnum;
	var saeheKorn = saatnum;
	var landKauf = kaufnum;
	
	if(isNaN(verteileKorn) || verteileKorn < 0){
		verteileKorn = 0;
		}
	if(isNaN(saeheKorn) || saeheKorn < 0){
		saeheKorn = 0;
		}
	if(isNaN(landKauf)){
		landKauf = 0;
		}
	bevoelkerung(verteileKorn);
	aussaat(saeheKorn);
	handel(landKauf);
}
function bevoelkerung(nahrung){
	if(nahrung > korn){
		nahrung = korn;
		}
		korn = korn - nahrung;
		var ausreichendNahrung = Math.round(nahrung / 20) - buerger;
		var neueBuerger = 0;
		if(ausreichendNahrung > 0){
			neueBuerger = ausreichendNahrung / 2;
			}
		var verstorbeneBuerger = 0;
		if(ausreichendNahrung < 0){
			verstorbeneBuerger = -ausreichendNahrung;
			}
		buerger = Math.round(buerger + neueBuerger - verstorbeneBuerger);
	}
function aussaat(saat){
	if(saat > korn){
		saat = korn;
		}
	korn = korn - saat;
	var moeglicheSaat = parseInt(saat / 2);
	
	if(moeglicheSaat > buerger * 10){
		moeglicheSaat = buerger * 10;
		}
	if(moeglicheSaat > land * 10){
		moeglicheSaat = land;
		}
	geerntetesKorn = ernteProAcker * moeglicheSaat;
	korn = korn + geerntetesKorn;
	}
	
function handel(kauf){
	if(kauf < 0){
		var verkauf = Math.abs(kauf);
		if(verkauf > land){
			alert("Zu wenig Land");
			return;
			}
		land = land - verkauf;
		korn = korn + verkauf * landPreis;
		}
	if(kauf > 0){
		if(kauf * landPreis > korn){
			alert("Nicht genug Korn für Landkauf!");
			return;
			}
		land = land + kauf;
		korn = korn - kauf * landPreis;
		}
	}
function erstelleBericht(){
	var ernte;
	switch(ernteProAcker){
		case 1:
			ernte = "Unwetter vernichteten Teile der Ernte.";
			break;
		case 2:
		case 3:
			ernte = "Das Wetter war schlecht.";
			break;
		case 6:
		case 7:
			ernte = "Das Wetter war gut. Die Ernte war reichlich.";
			break;
		case 8:
		case 9:
		case 10:
			ernte = "Das Wetter war sehr gut. Die Ernte war hervorragend.";
			break;
		case 4:
		case 5:
		default:
			ernte = "Das Wetter war normal";
			break;
		}
		
		var info = "Weiser Herrscher Hammurabi!<br>";
		info += "Wir schreiben das Jahr " + jahr + " Eurer Herrschaft.<br><br>";
		info += buerger + " treue Bürger zählt Euer Reich.<br>";
		info += ernte + "<br>" + korn + " Scheffel Korn lagern in den Kornkammern.<br>";
		info += land + " Acker Land besitzt Ihr.<br>";
		info += landPreis + " Scheffel Korn kostet ein Acker Land.<br><br>";
		info += "Nahrung "
		info += "<div onclick=\"setNahrung(10);\" class=\"button\">+10</div>";
		info += "<div onclick=\"setNahrung(100);\" class=\"button\">+100</div>";
		info += "<div onclick=\"setNahrung(1000);\" class=\"button\">+1000</div>";
		info += "<div onclick=\"setNahrungNull();\" class=\"button\">Reset</div>";
		info += "Die Nahrung: " + nahrungnum;
		info += "<br>";
		info += "Saat ";
		info += "<div onclick=\"setSaat(10);\" class=\"button\">+10</div>";
		info += "<div onclick=\"setSaat(100);\" class=\"button\">+100</div>";
		info += "<div onclick=\"setSaat(1000);\" class=\"button\">+1000</div>";
		info += "<div onclick=\"setSaatNull();\" class=\"button\">Reset</div>";
		info += "Die Saat: " + saatnum;
		info += "<br>";
		info += "Landkauf ";
		info += "<div onclick=\"setKauf(10);\" class=\"button\">+10</div>";
		info += "<div onclick=\"setKauf(100);\" class=\"button\">+100</div>";
		info += "<div onclick=\"setKauf(-10);\" class=\"button\">-10</div>";
		info += "<div onclick=\"setKauf(-100);\" class=\"button\">-100</div>";
		info += "<div onclick=\"setKaufNull();\" class=\"button\">Reset</div>";
		info += "Der Landkauf: " + kaufnum;
		info += "<br><br>";
		info += "<div onclick=\"spieleEineRunde();\" class=\"button\">Nächstes Jahr</div><br><br>";
		
		monitor.innerHTML = info;
		return;
	}
function pruefeEnde(){
	var abbruchGrund = "<br>";
	if(buerger < 1){
		ende = true;
		abbruchGrund += " Ihr habt zu wenige Untertanen. ";
		}
	if(korn < 1){
		ende = true;
		abbruchGrund += " Eure Kornkammern sind leer. ";
		}
	if(land < 1){
		ende = true;
		abbruchGrund += " Ihr habt zu wenig Land. ";
		}
	if(jahr > 20 && ende == false){
		ende = true;
		abbruchGrund = "Nach 20 Jahren ist das Ende Eurer Zeit als Herrscher gekommen.<br>Euer Name soll auf ewig gepriesen werden! Ihr habt weise und gerecht regiert.";
		}
	if(ende){
		abbruchGrund = "<br><br>Eure Herrschaft ist beendet. " + abbruchGrund + "<br><br>" + "<div onclick=\"restart();\" class=\"button\">Neustart</div><br><br>";
		monitor.innerHTML = abbruchGrund;
		}
	}
function bestimmeErnteErfolg(){
	ernteProAcker = Math.round(Math.random() * 5 + Math.random() * 5 + 0.5);
	}
function bestimmeLandPreis(){
	landPreis = Math.round(Math.random() * 10 + 0.5);
	if(Math.random() > 0.9){
		landPreis = Math.round(Math.random() * 15 + 0.5);
		}
	}
function setSaat(saatplus){
	saatnum = saatnum + saatplus;
	erstelleBericht();
	}
function setSaatNull(){
	saatnum = 0;
	erstelleBericht();
	}
function setNahrung(nahrungplus){
	nahrungnum = nahrungnum + nahrungplus;
	erstelleBericht();
	}
function setNahrungNull(){
	nahrungnum = 0;
	erstelleBericht();
	}
function setKauf(kaufplus){
	kaufnum = kaufnum + kaufplus;
	erstelleBericht();
	}
function setKaufNull(){
	kaufnum = 0;
	erstelleBericht();
	}
function restart(){
	location.reload();
	}
