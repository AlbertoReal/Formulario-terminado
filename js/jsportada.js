window.onload = function(){ 
	document.getElementById("a1").onclick = function () {
	document.getElementById("menu1").style.display="block";
	document.getElementById("menu2").style.display="none";
	document.getElementById("menu3").style.display="none";
	}
	document.getElementById("a2").onclick = function () {
	document.getElementById("menu2").style.display="block";
	document.getElementById("menu1").style.display="none";
	document.getElementById("menu3").style.display="none";
}
	document.getElementById("a3").onclick = function () {
	document.getElementById("menu3").style.display="block";
	document.getElementById("menu1").style.display="none";
	document.getElementById("menu2").style.display="none";
}
}