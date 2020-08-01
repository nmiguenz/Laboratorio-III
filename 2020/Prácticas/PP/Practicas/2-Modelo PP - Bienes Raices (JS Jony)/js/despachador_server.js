var xhr;

window.addEventListener('load',function(){
  traerPersonas();
  document.getElementById('btnAlta').addEventListener('click',generarForm);
})

function traerPersonas() {
  let url="http://localhost:3000/traer";
  xhr=new XMLHttpRequest();
  xhr.onreadystatechange = procesarTraerPersonas;
  xhr.open('GET',url,true);
  xhr.send();
}

function guardarPersona(persona) 
{
   var body=
   {
     "collection":"personas",
     "objeto":persona
   }
   var url="http://localhost:3000/agregar";
   xhr=new XMLHttpRequest();
   xhr.onreadystatechange=procesarAlta;
   xhr.open('POST',url,true);
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.send(JSON.stringify(body));
}

function eliminarPersona(id) 
{
 var requestBody={
   'collection':'personas',
   'id':id
 }
 var  url='http://localhost:3000/eliminar'
 xhr=new XMLHttpRequest();
 xhr.onreadystatechange=procesarEliminarPersona;
 xhr.open('POST',url,true);
 xhr.setRequestHeader('Content-Type','application/json');
 xhr.send(JSON.stringify(requestBody));
}

function modificarPersona(persona) {
  event.preventDefault();
  console.log(persona);
  var body=
  {
    "collection":"personas",
    "objeto":persona
  }
  var url="http://localhost:3000/modificar";
  xhr=new XMLHttpRequest();
  xhr.onreadystatechange=procesarModificacion;
  xhr.open('POST',url,true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
}
