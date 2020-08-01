//esto se ejecuta cuando empieza a correr windows
window.addEventListener("load", Click);

function Click(){
    var boton = document.getElementById("btn");
    boton.onclick = enviar;
}

function MostrarSpinner (http){
    var formulario = document.getElementById("spiner");
    formulario.hidden = true;
    
    http.onreadystatechange = function(){
        do {

            formulario.hidden = false;
            
        } while (http.readyState != 4);
    }
}

// //para GET
// function enviar(e){
//     e.preventDefault();    
//     var http = new XMLHttpRequest();

//         //forma con el GET
//         // function es una funcion anonima. Solo funciona si se la paso a una variable.
//         http.onreadystatechange = function(){
//             //esto se  va a saber cuando el servidor tenga la respuesta. No se cuando va a ser
//             console.log("llego respuesta", http.readyState, http.status);
//             if (http.readyState ===4){
//                 if(http.status ===200){
//                     console.log("Tenemos respuesta", http.responseText);
//                 }
//             }
//         }
//         var a = document.getElementById("usr");
//         var b = document.getElementById("usrPass");
//         http.open('GET', "http://localhost:3000/loginUsuario?usr="+a.value+"&pass="+b.value);
//         http.send();
// }

//para POST
//la informaci[on sensible, como el pass, deberia viajar de esta manera, porque va en el body
function enviar(e){
     e.preventDefault();    
     var http = new XMLHttpRequest();

         //forma con el GET
         // function es una funcion anonima. Solo funciona si se la paso a una variable.
        //  http.onreadystatechange = function(){
        //      //esto se  va a saber cuando el servidor tenga la respuesta. No se cuando va a ser
        //      console.log("llego respuesta", http.readyState, http.status);
        //      if (http.readyState ===4){
        //          if(http.status ===200){
        //              console.log("Tenemos respuesta", http.responseText);
        //          }
        //      }
        //  }
         var formulario = document.getElementById("spiner");
         formulario.hidden = true;
         http.onreadystatechange = function(){
             if (http.readyState === 4){
                formulario.hidden = true;
             }
             else
                formulario.hidden = false;
        }
         var a = document.getElementById("usr");
         var b = document.getElementById("usrPass");
         http.open('POST', "http://localhost:3000/loginUsuario", true);
         http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
         http.send("usr="+a.value+"&pass="+b.value);
}

function log(){
    var a = document.getElementById("usr");
    var b = document.getElementById("usrPass");
    alert(a.value);
    alert(b.value);
}

//log (puesto asi es un puntero a una funcion)