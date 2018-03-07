
var formElement = null;
var answerText = [];
var answerSelect = [];
var answerMultiple = [];
var answerRadio = [];
var answerCheckbox = [];
var nota = 0; 
window.onload = function(){ 
  formElement = document.getElementById('formulario');
    formElement.onsubmit = function() {
       inicializar();
       if (comprobar()){
                corregirText();
                corregirSelect();
                corregirMultiple();
                corregirCheckbox();
                corregirRadio();
                presentarNota(); 
        }
               return false; 
      }

  var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 }
 xhttp.open("GET", "https://rawgit.com/AlbertoReal/Formulario/master/preguntas.xml", true);
 xhttp.send();
  
}
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML;

  //Recuperamos el título de todas las preguntas
  var titulo=xmlDoc.getElementsByTagName("title").length;
  var titulos = [];
  for(var i = 0; i<titulo; i++){
    titulos[i] = xmlDoc.getElementsByTagName("title")[i].innerHTML;
  }
 ponerDatosInputHtml(titulos);

  //Recuperamos el título y la respuesta correcta del input text
    for (numberquestion=0; numberquestion<2; numberquestion++) {
        answerText[numberquestion] = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName("answer")[0].innerHTML;
    }
 //recuperamos las options de los selcts
 for (numberquestion=2; numberquestion<4; numberquestion++) {
        var opcionesSelect = [];
        var numberoptions = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName('option').length;
        for (i = 0; i < numberoptions; i++) {
            opcionesSelect[i] = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName('option')[i].innerHTML;
        }
        ponerDatosSelectHtml( opcionesSelect, numberquestion);
       answerSelect[numberquestion] = parseInt(xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName("answer")[0].innerHTML);

    }
 //recuperamos los select multiple   
  for (numberquestion=4; numberquestion<6; numberquestion++) {
        var opcionesSelect = [];
        var numberoptions = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName('option').length;
        for (i = 0; i < numberoptions; i++) {
            opcionesSelect[i] = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName('option')[i].innerHTML;
        }
        ponerDatosSelectMultipleHtml( opcionesSelect, numberquestion);
        var nres = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName('answer').length;
        answerMultiple[numberquestion]=[];
        for (i = 0; i < nres; i++) {
            answerMultiple[numberquestion][i] = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName("answer")[i].innerHTML;
        }
        
    }
  
  //recuperamos los chekbox
   for (numberquestion=6; numberquestion<8; numberquestion++) {
        var opcionesSelect = [];
        var numberoptions = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName('option').length;
        for (i = 0; i < numberoptions; i++) {
            opcionesSelect[i] = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName('option')[i].innerHTML;
        }
        ponerDatosChekboxHtml( opcionesSelect, numberquestion);
         var nres = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName('answer').length;
        answerCheckbox[numberquestion]=[];
        for (i = 0; i < nres; i++) {
            answerCheckbox[numberquestion][i] = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName("answer")[i].innerHTML;
        }
    }
  //recuperamos los radios  
    for (numberquestion=8; numberquestion<10; numberquestion++) {
        var opcionesSelect = [];
        var numberoptions = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName('option').length;
        for (i = 0; i < numberoptions; i++) {
            opcionesSelect[i] = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName('option')[i].innerHTML;
        }
        ponerDatosRadioHtml( opcionesSelect, numberquestion);
        var nres = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName('answer').length;
        answerRadio[numberquestion]=[];
        for (i = 0; i < nres; i++) {
            answerRadio[numberquestion][i] = xmlDoc.getElementsByTagName("question")[numberquestion].getElementsByTagName("answer")[i].innerHTML;
        }
    }
  }
  //Corrección de los text
function corregirSelect(){
    for(n=2;n<4;n++){
        var sel = formElement.elements[n];  
         if ((sel.selectedIndex-1)==answerSelect[n]) {
          solucion("Respuesta "+(n+1)+": Correcta" )
            nota +=1;
            }
        else {
          solucion("Respuesta "+(n+1)+": Incorrecta" )
            
        }       
    }       
}
function corregirText() {
    for(n=0;n<2;n++){
        var txt = formElement.elements[n].value;  
         if (txt.toLowerCase()==answerText[n]) {
           solucion("Respuesta "+(n+1)+": Correcta" )
            nota +=1;
        }else{  
             solucion("Respuesta "+(n+1)+": Incorrecta" )
        }
    }
}
function corregirMultiple(){
    for(n=4;n<6;n++){
        var sel = formElement.elements[n];
        var escorrecta=[];
        var mal=false;
        for(i=0;i<(sel.length);i++){
            var opt=sel.options[i];
            if(opt.selected){
                escorrecta[i]=false; 
                for (j = 0; j < answerMultiple[n].length; j++) {
                    if ((i)==answerMultiple[n][j]) escorrecta[i]=true;
                }
                //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
                if (escorrecta[i]) {
                    nota +=1.0/answerMultiple[n].length;  //dividido por el número de respuestas correctas   
                    solucion("Respuesta "+(n+1)+": seleccionada "+i+" Correcta");    
                } else {
                    nota -=1.0/answerMultiple[n].length;  //dividido por el número de respuestas correctas   
                   solucion("Respuesta "+(n+1)+": seleccionada " +i+" Incorrecta");
                    mal=true;
                }
            }
        }
      }
    }
function corregirRadio(){
    var f=formElement;
    for(n=8;n<10;n++){
        var nombreRadio;
        if (n==8){
            nombreRadio=f.nombre0;
        } else {
            nombreRadio=f.nombre1;
        }
        if (nombreRadio.value==answerRadio[n]) {
            solucion("Respuesta "+(n+1)+": Correcta" )
            nota +=1;
            }
        else {
             solucion("Respuesta "+(n+1)+": Incorrecta" )
    }        
}
}

    
function corregirCheckbox(){
  var f=formElement;
  var escorrecta = [];
  for (n=6;n<8;n++){
    var nombre;
    var mal=false;
    if (n==6){
        nombre=f.nombres0;
    } else {
        nombre=f.nombres1;
    }

    for (i = 0; i < nombre.length; i++) {  
        if (nombre[i].checked) {
            escorrecta[i]=false;     
            for (j = 0; j < answerCheckbox[n].length; j++) {
                if (i==answerCheckbox[n][j]) escorrecta[i]=true;
            }
            //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
            if (escorrecta[i]) {
                nota +=1.0/answerCheckbox[n].length;  //dividido por el número de respuestas correctas   
                solucion("Respuesta "+(n+1)+": seleccionada "+(i)+" Correcta");    
            } else {
                nota -=1.0/answerCheckbox[n].length;  //dividido por el número de respuestas correctas   
                solucion("Respuesta "+(n+1)+": seleccionada "+(i)+" Incorrecta");
                mal=true;
            }   
        } 
    }
  }
}

function ponerDatosInputHtml(t){
  var question = document.getElementsByTagName("h3").length;
  for(var i = 0; i <question; i++){
 document.getElementsByTagName("h3")[i].innerHTML = t[i];
  }
}
//poner sleect html
function ponerDatosSelectHtml( opt, numberquestion) {

    var select = document.getElementsByTagName("select")[numberquestion-2];
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i;
        select.options.add(option);
    }
  }
  //poner selec multiple html
  function ponerDatosSelectMultipleHtml( opt, numberquestion) {
    var select = document.getElementsByTagName("select")[numberquestion-2];
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i;
        select.options.add(option);
    }
  }
      var a = 0;
      var b = 0;
  //poner datos chekbox
    function ponerDatosChekboxHtml( opt, numberquestion) {
        var chekboxoptions = document.getElementsByClassName("checkboxclas")[numberquestion-6];
        for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML=opt[i];
        input.type="checkbox";
        input.value=i;
        input.name=("nombres"+a);
        input.id=("chk"+b);
        label.htmlFor=("chk"+b);
        chekboxoptions.appendChild(input);
        chekboxoptions.appendChild(label);
        chekboxoptions.appendChild(document.createElement("br"));
       b++;
    }
      chekboxoptions.appendChild(document.createElement("br"));
       a++;
  }
      var c = 0;
      var d = 0;
  //poner datos radio
 function ponerDatosRadioHtml( opt, numberquestion) {
    var radioptions = document.getElementsByClassName("radio1")[numberquestion-8];
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML=opt[i];
        input.type="radio";
        input.value=i;
        input.name=("nombre"+c);
        input.id=("rad"+d);
        label.htmlFor=("rad"+d);
        radioptions.appendChild(input);
        radioptions.appendChild(label);
        radioptions.appendChild(document.createElement("br"));
        d++;
    }
      radioptions.appendChild(document.createElement("br"));
     c++;
  }
function solucion(e) {
    var p = document.createElement("p");
    var node = document.createTextNode(e);
    p.appendChild(node);
    document.getElementById('resultadosDiv').appendChild(p);
}


function presentarNota() {
    document.getElementById('notaFinal').style.display="block";
    document.getElementById('principal').style.display="none";
    document.getElementById("notaza").innerHTML="Nota: " + nota.toFixed(2) + " puntos sobre 10";

}

function inicializar() {
    document.getElementById('resultadosDiv').innerHTML = "";
    nota = 0.0;

}
function comprobar(){
   var f=formElement;
   // text
   for(numPreg=0;numPreg<2;numPreg++){
    if (f.elements[numPreg].value=="") {
    f.elements[numPreg].focus();
    alert("pregunta en blanco"+(numPreg+1));
    return false;
    }
   }
   //select normal
   for(numPreg=2;numPreg<4;numPreg++){
    if (f.elements[numPreg].selectedIndex==0) {
    f.elements[numPreg].focus();
    alert("pregunta en blanco"+(numPreg+1));
    return false;
    }
   }
   //select multiple
     for(numPreg=4;numPreg<6;numPreg++){
       var multRespondido=false;
        for(i=1;i<(f.elements[numPreg].length);i++){
            var opt=f.elements[numPreg].options[i];
            if(opt.selected){
                multRespondido=true;
            }
        }
        if (!multRespondido) {
        f.elements[numPreg].focus();
        alert("Pregunta en blanco"+(numPreg+1));
        return false;
        }
   }
    for(numPreg=6;numPreg<8;numPreg++){
        var checked=false;
        var nombre;
        if (numPreg==6){
            nombre=f.nombres0;
        } else {
           nombre=f.nombres1;
        }
        for (i = 0; i < nombre.length; i++) {  
            if (nombre[i].checked) {
            checked=true;
             }
        }
        if (!checked) {
        nombre[0].focus();
        alert("pregunta en blanco"+(numPreg+1));
        return false;
        }
   }

   // radio
   for(numPreg=8;numPreg<10;numPreg++){
       var nombreRadio;
        if (numPreg==8){
            nombreRadio=f.nombre0;
        } else {
            nombreRadio=f.nombre1;
        }
        if (nombreRadio.value=="") {
            nombreRadio[0].focus();
            alert("pregunta en blanco"+(numPreg+1));
            return false;
        }   
    }
  return true;
}
