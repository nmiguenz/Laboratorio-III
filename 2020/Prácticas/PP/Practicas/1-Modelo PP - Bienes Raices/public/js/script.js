import Propiedad from './entidades.js';

let spinner = document.getElementById('spinner');
let formulario = document.getElementById('myForm');
let btnCancelar = document.getElementById('btnCancelar');
let tabla = document.getElementById('tablaLista');
let botonesTabla = document.getElementById('botonesTabla');
let btnBaja = document.getElementById('btnBaja');
let btnModificar = document.getElementById('btnEditar');

let indiceRow;
let listaProp;
let xhr;

let img = document.createElement('img');
img.setAttribute('src','./img/spinner.gif');
img.setAttribute('alt', 'spinner');

window.addEventListener('load', traerPropiedades);
formulario.addEventListener('submit', nuevaPropiedad);
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
function traerPropiedades(){
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = ()=>{
        
        if(xhr.readyState == 4){
            spinner.removeChild(img);
            if(xhr.status == 200){
                
                listaProp = JSON.parse(xhr.responseText).data;
                var tabla=document.getElementById('bodyTabla');

                document.getElementById('tablaHeader').style='display: block';
                
                listaProp.forEach(propiedad => {
                    
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
    completarCamposProp();
}

//Instancia un nuevo objeto propiedad
function nuevaPropiedad(e){
    e.preventDefault();
    
    let titulo = document.getElementsByName('titulo')[0].value;
    let transaccion;

    if(document.getElementById('rdoAlquiler').checked)
    {
        transaccion = 'alquiler';
    }
    else{
        transaccion ='venta';
    }

    let descripcion = document.getElementsByName('descripcion')[0].value;
    let precio = parseInt(document.getElementsByName('precio')[0].value);
    let bano = parseInt(document.getElementsByName('banos')[0].value);
    let autos = parseInt(document.getElementsByName('autos')[0].value);
    let dormitorio = parseInt(document.getElementsByName('dormitorios')[0].value); 
    
    let nuevaProp = new Propiedad(null,titulo,transaccion,descripcion,precio,bano,autos,dormitorio);
    
    altaProp(nuevaProp);
    
}

//Da de ALTA una propiedad en el servidor
function altaProp(prop){
    xhr = server();
    xhr.open('POST', 'http://localhost:3000/alta');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(prop));
    
    location.reload();
}

//Limpia el formulario al presionar CANCELAR
function limpiarFormulario() {
    document.getElementById("myForm").reset();
}

//Completa los campos del formulario con el valor de la row
function completarCamposProp(){
    console.log(listaProp[indiceRow].id);
    console.log(listaProp[indiceRow]);
    document.getElementById("txtTitulo").value = listaProp[indiceRow].titulo;
    document.getElementById("txtDescripcion").value = listaProp[indiceRow].descripcion;
    document.getElementById("rdoAlquiler").value = listaProp[indiceRow].transaccion;
    document.getElementById("txtPrecio").value = listaProp[indiceRow].precio;
    document.getElementById("txtBanos").value = listaProp[indiceRow].num_wc;
    document.getElementById("txtAutos").value = listaProp[indiceRow].num_estacionamiento;
    document.getElementById("txtDormitorios").value = listaProp[indiceRow].num_dormitorio;
}

//BAJA de la propiedad en el SERVIDOR
btnBaja.addEventListener('click', ()=>{
    let id = parseInt(listaProp[indiceRow].id);

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

//MODIFICA la propiedad en el SERVIDOR
btnModificar.addEventListener('click', ()=>{
    //event.preventDefault();
    let id = String(listaProp[indiceRow].id);
    
    let titulo = document.getElementById("txtTitulo").value;
    if(document.getElementById('rdoAlquiler').checked)
    {
        listaProp[indiceRow]['transaccion'] = 'alquiler';
        var transaccion = 'alquiler';
    }
    else{
        listaProp[indiceRow]['transaccion'] ='venta';
        var transaccion = 'venta';
    }

    let descripcion = document.getElementById("txtDescripcion").value;;
    let precio = document.getElementById("txtPrecio").value;
    let bano = document.getElementById('txtBanos').value;
    let autos = document.getElementById('txtAutos').value;
    let dormitorio = document.getElementById('txtDormitorios').value;

    listaProp[indiceRow] = new Propiedad(id,titulo,transaccion,descripcion,precio,bano,autos,dormitorio);
    console.log(listaProp[indiceRow]);
    console.log(listaProp);

    xhr = server();
    xhr.open('POST', 'http://localhost:3000/modificar');
    
    //Le paso un dato como si se lo hubiesemos extraido del formulario 
    xhr.setRequestHeader("Content-Type", "application/json");

    //Si mando mas de una variable
    //xhr.send(`id=${id}&nombre=`);
    xhr.send(JSON.stringify(listaProp[indiceRow]));
});

// const bajaLocal = (id) => {
//     let auxAnuncio = anuncios.filter(item => item.id !== (id).toString());
//     console.dir(auxAnuncio)
//     localStorage.setItem('listaAnuncios', JSON.stringify(auxAnuncio));
//     //location.reload()
//     table.deleteRow(indiceRow)
// };