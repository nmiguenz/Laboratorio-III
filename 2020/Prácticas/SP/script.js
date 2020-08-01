import Auto from './entidad.js';

let spinner = document.getElementById('spinner');
let formulario = document.getElementById('myForm');
let btnCancelar = document.getElementById('btnCancelar');
let botonesTabla = document.getElementById('botonesTabla');
let btnBaja = document.getElementById('btnBaja');
let btnModificar = document.getElementById('btnEditar');

let indiceRow;
let arrayAnuncios;
let transaccion;
let xhr;

//Info para setear el spinner dinamicamente
let img = document.createElement('img');
img.setAttribute('src','../img/volante_spinner.gif');
img.setAttribute('alt', 'spinner');

window.addEventListener('load', traerAnuncios);
formulario.addEventListener('submit', nuevoAnuncio);
btnCancelar.addEventListener('click', limpiarFormulario);

//Instancia del objeto XMLHttpRequest
//Acceso al estado del SERVIDOR
function server(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            spinner.removeChild(img);
            if(xhr.status == 200){
                
                console.log(JSON.parse(xhr.responseText));
            }
            else{
                console.log(xhr.status + " " + xhr.statusText);
            } 
        }
        else{
            spinner.appendChild(img);
        } 
        
    }
    return xhr;
}

//CARGA la lista cuando termino el load de la pagina
function traerAnuncios(){
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = ()=>{
        
        if(xhr.readyState == 4){
            spinner.removeChild(img);
            if(xhr.status == 200){
                
                arrayAnuncios = JSON.parse(xhr.responseText).data;
                console.log(JSON.parse(xhr.responseText).message)
                console.log(arrayAnuncios);
                var tabla=document.getElementById('bodyTabla');

                document.getElementById('tablaHeader').style='display: block';
                
                arrayAnuncios.forEach(propiedad => {
                    
                    var tr = document.createElement('tr');
    
                    Object.entries(propiedad).forEach(([key, value]) => {
                        var td=document.createElement('td');
                        var texto=document.createTextNode(value);
                        td.appendChild(texto);
                        
                        tr.appendChild(td);
                        tr.setAttribute('onclick', "setIndex(this)");
                        tabla.appendChild(tr);
                    });
                });
            }
            else{
                console.log(xhr.status + " " + xhr.statusText);
            } 
        }
        else{
            spinner.appendChild(img);
        }
    
    }
    xhr.open('GET', 'http://localhost:3000/traer');
    xhr.send();
}

//Setea el indice de la FILA
// Completa los campos del formulario con la fila que presione
window.setIndex = (e) => {
    botonesTabla.style.display = 'block';
    indiceRow = e.rowIndex-1;
    completarCamposAnuncio();
}

//Instancia un nuevo objeto propiedad
function nuevoAnuncio(e){
    e.preventDefault();
    
    let titulo = document.getElementsByName('titulo')[0].value;
    let auxTransaccion = document.getElementById("transaccion");
    transaccion = auxTransaccion.options[auxTransaccion.selectedIndex].value;
    let precio = parseInt(document.getElementsByName('precio')[0].value);
    let puertas = parseInt(document.getElementsByName('puertas')[0].value);
    let kms = parseInt(document.getElementsByName('km')[0].value);
    let potencia = parseInt(document.getElementsByName('potencia')[0].value); 
    
    let nuevoAnuncio = new Auto(null,titulo,transaccion,precio,puertas,kms,potencia);
    
    location.reload();
    altaAnuncio(nuevoAnuncio);
    
}

//Da de ALTA una propiedad en el servidor
function altaAnuncio(anuncio){
    xhr = server();
    xhr.open('POST', 'http://localhost:3000/alta');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(anuncio));
    
    //location.reload();
}

//Limpia el formulario al presionar CANCELAR
function limpiarFormulario() {
    document.getElementById("myForm").reset();
}

//Completa los campos del formulario con el valor de la row
function completarCamposAnuncio(){

    document.getElementById("txtTitulo").value = arrayAnuncios[indiceRow].titulo;
    document.getElementById("transaccion").value = arrayAnuncios[indiceRow].transaccion;
    document.getElementById("txtPrecio").value = arrayAnuncios[indiceRow].precio;
    document.getElementById("txtPuertas").value = arrayAnuncios[indiceRow].num_puertas;
    document.getElementById("txtKm").value = arrayAnuncios[indiceRow].num_kms;
    document.getElementById("txtPotencia").value = arrayAnuncios[indiceRow].potencia;
}

//BAJA logica del anuncio en el SERVIDOR
btnBaja.addEventListener('click', ()=>{
    let id = parseInt(arrayAnuncios[indiceRow].id);

    xhr = server();
    xhr.open('POST', 'http://localhost:3000/baja');
    
    //Le paso un dato como si se lo hubiesemos extraido del formulario 
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //Si mando mas de una variable
    //xhr.send(`id=${id}&nombre=`);
    xhr.send(`id=${id}`);
    
    //Refresca la pagina donde actua el codigo
    location.reload();
});

//MODIFICA el anuncio en el SERVIDOR
btnModificar.addEventListener('click', ()=>{
    //event.preventDefault();
    let id = String(arrayAnuncios[indiceRow].id);
    
    let titulo = document.getElementById("txtTitulo").value;
    let auxTransaccion = document.getElementById("transaccion");
    transaccion = auxTransaccion.options[auxTransaccion.selectedIndex].value;
    let precio = parseInt(document.getElementById('txtPrecio').value);
    let puertas = parseInt(document.getElementById('txtPuertas').value);
    let kms = parseInt(document.getElementById('txtKm').value);
    let potencia = parseInt(document.getElementById('txtPotencia').value); 
    
    arrayAnuncios[indiceRow] = new Auto(id,titulo,transaccion,precio,puertas,kms,potencia);

    xhr = server();
    xhr.open('POST', 'http://localhost:3000/modificar');
    
    //Le paso un dato como si se lo hubiesemos extraido del formulario 
    xhr.setRequestHeader("Content-Type", "application/json");

    //Si mando mas de una variable
    //xhr.send(`id=${id}&nombre=`);
    xhr.send(JSON.stringify(arrayAnuncios[indiceRow]));
    location.reload();
});

