//------ Importo la clase anuncio ---------
import { Anuncio_Auto } from "./anuncio.js";
import { Etransaccion } from "./Etransaccion.js";

//------- BOTONES --------------------------
let btnCancelar = document.getElementById('btnCancelar');
let botonesTabla = document.getElementById('botonesTabla');
let btnBaja = document.getElementById('btnBaja');
let btnModificar = document.getElementById('btnEditar');

//------- COMPONENTES -----------------------
let formulario = document.getElementById('myForm');
let table = document.getElementById('tabla');
let contentCheckbox = document.getElementById('filtroCheckbox');
let contentFilterTransaccion = document.getElementById('filtrarTransaccion');
let contentFilterPrecioMax = document.getElementById('filtrarPrecio');

//------- Variables globales -----------------
let indiceRow;
let arrayAnuncios;
let filtroCheckPref = [];
let transaccion;
let xhr;
let arrayHeader = ["id", "titulo", "transaccion", "descripcion", "precio", "num_puertas", "num_kms", "potencia"];

//-------- SPINNER -------------------------------
let spinner = document.getElementById('spinner');
let img = document.createElement('img');
img.setAttribute('src', '../img/volante_spinner.gif');
img.setAttribute('alt', 'spinner');


//-------- EVENTOS -------------------------------
//window.addEventListener('load', taerLocal);
window.addEventListener('load', taerLocalStorage);
formulario.addEventListener('submit', nuevoAnuncio);
btnCancelar.addEventListener('click', limpiarFormulario);
contentCheckbox.addEventListener("click", (event) => modificarChk(event), false);
contentFilterTransaccion.addEventListener('click', (event) => filtroTransaccion(event), false);
// btnBaja.addEventListener('click', bajaConJson);
//contentFilterPrecioMax.addEventListener('click',(event) => precioMaximo(event), false )

//-------- ENUMERADOS -----------------------------
enumeradoTransaccion('transaccion');
enumeradoTransaccion('filtrarTransaccion');
function enumeradoTransaccion(id){
    let select = document.getElementById(id);
    for (const key in Etransaccion) {
      if(isNaN(key)){
        let option = document.createElement('option');
        let texto = document.createTextNode(key);
        option.appendChild(texto);
        option.setAttribute('value', key);
        select.appendChild(option);
      }
    }
}

//-------------------------------------- FUNCIONES -------------------------------------------------

//Agrega un renglon de la tabla (th),
const agregarRowTableTh = (element) => {
    let array;
    let thead = document.createElement('thead');
    thead.setAttribute('class', 'thead-dark');
    let tr = document.createElement("tr");

    /**agrego */
    if (filtroCheckPref.length) {
        filtroCheckPref.forEach(field => {
            array = element.filter(item => item !== field.name);
            element = array;
        })
    }
    else {
        array = element;
    }
    //----------//

    array.forEach((item) => {
        let th = document.createElement('th');
        th.innerHTML = item;

        tr.appendChild(th)
    })
    thead.appendChild(tr)
    table.appendChild(thead);
};

//Agrega los dinamicamente los campos del JSON a la tabla
const agregarRowTableTd = (arrayAnuncios, arrayHeader) => {

    //----------add--------------------
    let array = [];

    if (arrayHeader) {
        let auxArrayData;
        if (filtroCheckPref.length) {

            filtroCheckPref.forEach(field => {
                auxArrayData = arrayHeader.filter(item => item !== field.name);
                arrayHeader = auxArrayData;
            });
            console.dir(auxArrayData)
        }
        else {
            console.log(arrayHeader)
            auxArrayData = arrayHeader;
        }

        arrayAnuncios.forEach(anuncio => {
            let tr = document.createElement("tr");
            tr.setAttribute('onclick', "setIndex(this)");
            auxArrayData.forEach(any => {
                let td = document.createElement('td');
                td.innerHTML = anuncio[any];
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
    }
    else {
        arrayAnuncios.forEach(anuncio => {
            let flag = true, auxArray, tr = document.createElement("tr");
            tr.setAttribute('onclick', "setIndex(this)");

            if (filtroCheckPref.length) {
                filtroCheckPref.forEach(field => {
                    if (flag) {
                        array = Object.keys(anuncio).filter(item => item !== field.name);
                        auxArray = array;
                        flag = false;
                    } else {
                        array = auxArray.filter(item => item !== field.name);
                        auxArray = array
                    }
                })

                array.forEach(item => {
                    let td = document.createElement('td');
                    td.innerHTML = anuncio[item];
                    tr.appendChild(td)
                })
            } else {
                Object.values(anuncio).forEach(item => {
                    let td = document.createElement('td');
                    td.innerHTML = item;
                    tr.appendChild(td)
                })
            }
            table.appendChild(tr)
        })
    }
    ///------------------------------

    // if (arrayHeader) {
    //     Object.values(arrayAnuncios).forEach(item => {
    //         let tr = document.createElement("tr");
    //         tr.setAttribute('onclick', "setIndex(this)");
    //         arrayHeader.forEach(any => {
    //             let td = document.createElement('td');
    //             td.innerHTML = item[any];
    //             tr.appendChild(td)
    //         })
    //         table.appendChild(tr)
    //     })
    // } else {
    //     console.dir(arrayAnuncios);
    //     arrayAnuncios.forEach(anuncio => {
    //         let tr = document.createElement("tr");
    //         tr.setAttribute('onclick', "setIndex(this)");
    //         Object.values(anuncio).forEach(item => {
    //             let td = document.createElement('td');
    //             td.innerHTML = item;
    //             tr.appendChild(td)
    //         })
    //         table.appendChild(tr)
    //     })
    // }
};

//Setea el indice de la FILA
// Completa los campos del formulario con la fila que presione
window.setIndex = (e) => {
    botonesTabla.style.display = 'block';
    indiceRow = e.rowIndex - 1;
    completarCamposAnuncio();
}

//------------------------- FORMULARIO -----------------------------------

//Limpia el formulario al presionar CANCELAR
function limpiarFormulario() {
    document.getElementById("myForm").reset();
}

//Completa los campos del formulario con el valor de la row
function completarCamposAnuncio() {

    document.getElementById("txtTitulo").value = arrayAnuncios[indiceRow].titulo;
    document.getElementById("transaccion").value = arrayAnuncios[indiceRow].transaccion;
    document.getElementById("txtDescripcion").value = arrayAnuncios[indiceRow].descripcion;
    document.getElementById("txtPrecio").value = arrayAnuncios[indiceRow].precio;
    document.getElementById("txtPuertas").value = arrayAnuncios[indiceRow].num_puertas;
    document.getElementById("txtKm").value = arrayAnuncios[indiceRow].num_kms;
    document.getElementById("txtPotencia").value = arrayAnuncios[indiceRow].potencia;
}

//-------------------------- ABM SERVER -----------------------------------
//Instancia del objeto XMLHttpRequest
//Acceso al estado del SERVIDOR
function server() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            spinner.removeChild(img);
            if (xhr.status == 200) {

                console.log(JSON.parse(xhr.responseText));
            }
            else {
                console.log(xhr.status + " " + xhr.statusText);
            }
        }
        else {
            spinner.appendChild(img);
        }

    }
    return xhr;
}

//CARGA la lista cuando termino el load de la pagina
function traerAnuncios() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) {
            spinner.removeChild(img);
            if (xhr.status == 200) {

                arrayAnuncios = JSON.parse(xhr.responseText).data;
                taerLocal();

                agregarRowTableTh(arrayHeader);
                agregarRowTableTd(arrayAnuncios);
                

            }
            else {
                console.log(xhr.status + " " + xhr.statusText);
            }
        }
        else {
            spinner.appendChild(img);
        }

    }
    xhr.open('GET', 'http://localhost:3000/traer');
    xhr.send();
}

//Instancia un nuevo objeto ANUNCIO
function nuevoAnuncio(e) {
    e.preventDefault();

    let titulo = document.getElementsByName('titulo')[0].value;
    let auxTransaccion = document.getElementById("transaccion");
    transaccion = auxTransaccion.options[auxTransaccion.selectedIndex].value;
    let descripcion = document.getElementsByName('descripcion')[0].value;
    let precio = parseInt(document.getElementsByName('precio')[0].value);
    let puertas = parseInt(document.getElementsByName('puertas')[0].value);
    let kms = parseInt(document.getElementsByName('km')[0].value);
    let potencia = parseInt(document.getElementsByName('potencia')[0].value);
    let id = arrayAnuncios.length+1;
    let nuevoAnuncio = new Anuncio_Auto(id, titulo, transaccion, descripcion, precio, puertas, kms, potencia);

    //altaAnuncio(nuevoAnuncio);
    altaLocalStorage(nuevoAnuncio);
    location.reload();

}

//ALTA
function altaAnuncio(anuncio) {
    xhr = server();
    xhr.open('POST', 'http://localhost:3000/alta');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(anuncio));

    //location.reload();
}

//BAJA
btnBaja.addEventListener('click', () => {
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

function bajaConJson() {

    let id = parseInt(arrayAnuncios[indiceRow].id);

    $.ajax({
        url: "http://localhost:3000/baja",
        method: 'POST',
        data: `id=${id}`,
        contentType: 'application/x-www-form-urlencoded',
        success: function (resultado) {
            console.log(JSON.parse(resultado).message);
            alert('Baja exitosa');
        },
        error: function () {
            console.log("Error");
        },
        complete: function () {
            console.log("Complete");
            alert('Baja exitosa');
            location.reload();
        }
    });
}

//MODIFICACION
btnModificar.addEventListener('click', () => {
    //event.preventDefault();
    let id = String(arrayAnuncios[indiceRow].id);

    let titulo = document.getElementById("txtTitulo").value;
    let auxTransaccion = document.getElementById("transaccion");
    transaccion = auxTransaccion.options[auxTransaccion.selectedIndex].value;
    let descripcion = document.getElementById("txtDescripcion").value;
    let precio = parseInt(document.getElementById('txtPrecio').value);
    let puertas = parseInt(document.getElementById('txtPuertas').value);
    let kms = parseInt(document.getElementById('txtKm').value);
    let potencia = parseInt(document.getElementById('txtPotencia').value);

    arrayAnuncios[indiceRow] = new Anuncio_Auto(id, titulo, transaccion, descripcion, precio, puertas, kms, potencia);

    xhr = server();
    xhr.open('POST', 'http://localhost:3000/modificar');

    //Le paso un dato como si se lo hubiesemos extraido del formulario 
    xhr.setRequestHeader("Content-Type", "application/json");

    //Si mando mas de una variable
    //xhr.send(`id=${id}&nombre=`);
    xhr.send(JSON.stringify(arrayAnuncios[indiceRow]));
    location.reload();
});

//------------------------- LOCAL STORAGE --------------------------------------
//LOAD LOCAL
function taerLocalStorage() {
    let auxArrayAnuncios = JSON.parse(localStorage.getItem('anuncios')) || [];
    
    if(auxArrayAnuncios){        
        arrayAnuncios = auxArrayAnuncios?.map(item => new Anuncio_Auto(item.id, item.titulo, item.transaccion, item.descripcion, item.precio, item.num_puertas, item.num_kms, item.potencia));
        
        taerLocal(); //Trae los FILTROS

        agregarRowTableTh(arrayHeader);
        agregarRowTableTd(arrayAnuncios);

    }
    else {
        console.log('No hay Lista anuncios en LocalStorage');
    }
};

//ALTA
const altaLocalStorage = (item) => {
    if (arrayAnuncios) {
        arrayAnuncios.push(item)
    } else {
        arrayAnuncios = [item]
    }
    localStorage.setItem('anuncios', JSON.stringify(arrayAnuncios));
    location.reload()
};

//BAJA
btnBaja.addEventListener('click', () => {
    let id = parseInt(arrayAnuncios[indiceRow].id);
    let auxAnuncio = arrayAnuncios.filter(item => item.id !== id);
    localStorage.setItem('anuncios', JSON.stringify(auxAnuncio));
    location.reload()

});

//MODIFICACION
btnModificar.addEventListener('click', ()=>{
    //event.preventDefault();
    let id = String(arrayAnuncios[indiceRow].id);
    //let arrayAnunciosAux = [];

    let titulo = document.getElementById("txtTitulo").value;
    let auxTransaccion = document.getElementById("transaccion");
    transaccion = auxTransaccion.options[auxTransaccion.selectedIndex].value;
    let precio = parseInt(document.getElementById('txtPrecio').value);
    let puertas = parseInt(document.getElementById('txtPuertas').value);
    let kms = parseInt(document.getElementById('txtKm').value);
    let potencia = parseInt(document.getElementById('txtPotencia').value); 

    arrayAnuncios[indiceRow] = new Anuncio_Auto(id,titulo,transaccion,precio,puertas,kms,potencia);

    localStorage.setItem('anuncios', JSON.stringify(arrayAnuncios));
    location.reload();
});


//------------------------- FILTRO DE COLUMNAS (CHK) ----------------------------
//Alta local de los objetos
const altaLocal = (array) => {
    localStorage.setItem('listaAnuncios', JSON.stringify(array));
    //location.reload()
};

//Trae la lista de filtros
function taerLocal() {
    filtroCheckPref = JSON.parse(localStorage.getItem('listaAnuncios')) || [];

    if (filtroCheckPref.length) {
        filtroCheckPref.forEach(item => {
            document.getElementById(item.id).checked = false;
        });

        //agregarRowTableTh(arrayHeader);
        //agregarRowTableTd(arrayAnuncios, null);

    } else {
        console.log('No hay Lista anuncios en LocalStorage');
    }
};

// Al seleccionar un CheckBox oculta el campo
// Falta solucionar la carga de los datos
const modificarChk = (event) => {
    let checkboxAux, checkboxAuxId, nuevoArray, checkboxAuxName, targetValue = event.target.value;

    if (targetValue) {

        checkboxAux = document.getElementById(targetValue);
        switch (targetValue) {
            case 'tituloChk':
                checkboxAuxName = "titulo";
                checkboxAuxId = "tituloChk";
                break;
            case 'transaccionChk':
                checkboxAuxName = "transaccion";
                checkboxAuxId = "transaccionChk";
                break;
            case 'descripcionChk':
                checkboxAuxName = "descripcion";
                checkboxAuxId = "descripcionChk";
                break;
            case 'precioChk':
                checkboxAuxName = "precio";
                checkboxAuxId = "precioChk";
                break;
            case 'puertasChk':
                checkboxAuxName = "num_puertas";
                checkboxAuxId = "puertasChk";
                break;
            case 'numeroKmsChk':
                checkboxAuxName = "num_kms";
                checkboxAuxId = "numeroKmsChk";
                break;
            case 'potenciaChk':
                checkboxAuxName = "potencia";
                checkboxAuxId = "potenciaChk";
                break;
            default:
                break;
        };

        //saco columnas
        if (!checkboxAux.checked) {
            nuevoArray = arrayHeader.filter(item => item !== checkboxAuxName);
            arrayHeader = nuevoArray;

            if (filtroCheckPref) {
                filtroCheckPref.push({ name: checkboxAuxName, id: checkboxAuxId });
            } else {
                filtroCheckPref = [{ name: checkboxAuxName, id: checkboxAuxId }]
                console.log(filtroCheckPref);
            }

        } else {
            //agrego columnas
            //Falta solucionar el orden
            /**Agrego */
            if (!arrayHeader.find(item => item === checkboxAuxName)) {
                arrayHeader.push(checkboxAuxName);
            }
            //-----------------------------------
            //arrayHeader.push(checkboxAuxName);
            if (filtroCheckPref) {
                let aux = filtroCheckPref.filter(item => item.name !== checkboxAuxName)
                filtroCheckPref = aux;
            }
        }
        table.innerHTML = '';
        altaLocal(filtroCheckPref);
        agregarRowTableTh(arrayHeader);
        agregarRowTableTd(arrayAnuncios, arrayHeader);
    }
}

//-------------------------- FILTRAR TRANSACCIONES ------------------------------
let filtroTransaccion = (event)=>{
    
    if(event.target.value){
        //PROMEDIO PRECIO
        let numTipoTransaccion = arrayAnuncios.filter(anuncio =>     
            anuncio.transaccion == event.target.value);
    
        console.dir(arrayAnuncios);
        let transaccionTotal = arrayAnuncios.filter(anuncio =>     
                    anuncio.transaccion == event.target.value)
                    .map(anuncio => anuncio.precio)
                    .reduce((a,b)=>{
                        console.dir(a);
                        console.dir(b);
                        return a+b;});

        document.getElementById("filtrarPromedio").value = transaccionTotal / numTipoTransaccion.length;

        //Precio MAXIMO
        let precio = arrayAnuncios.filter(anuncio =>     
                anuncio.transaccion == event.target.value)
                .reduce(function(max, item) {
                if(item.precio > max){
                    return max = item.precio;
                }
                else{
                    return max;
                }  
                
            },0);

        document.getElementById("filtrarMax").value = precio;

        //Precio MINIMO
        let precioMin = arrayAnuncios.filter(anuncio =>     
                anuncio.transaccion == event.target.value)
                .reduce(function(min, item) {
                    if(item.precio < min){
                        return min = item.precio;
                    }
                    else{
                        return min;
                    }  
                    
                },30000000);

        document.getElementById("filtrarMin").value = precioMin;
       
        //POTENCIA
        let potenciaTotal = arrayAnuncios.filter(anuncio =>     
                anuncio.transaccion == event.target.value)
                .reduce(function(acum, item) {
                    if(item.potencia > 0){
                        return acum + item.potencia;
                    }
                    else{
                        return acum;
                    } 
                    
                },0);
    
        document.getElementById("filtrarPotencia").value = potenciaTotal / numTipoTransaccion.length;
        
    }

    table.innerHTML = '';
    agregarRowTableTh(arrayHeader);

    Object.values(arrayAnuncios).forEach(anuncio => {
        if (anuncio.transaccion === event.target.value) {
            let tr = document.createElement("tr");
            tr.setAttribute('onclick', "setIndex(this)");
            Object.values(anuncio).forEach(item => {
                let td = document.createElement('td');
                td.innerHTML = item;
                tr.appendChild(td)
            })
            table.appendChild(tr)
        }
    });
    
}


// -------------------- AJAX con Async y await ----------------------------------
//Traer con FETCH
const traerAjax = async () => {
    try {
        let datos = await fetch('http://localhost:3000/traer')
        let data = await datos.json();
        console.log(data.data);
        personas = data.data;
    } catch (error) {
        console.error(error);
    }
}

const altaAjax = async (item) => {

    try {
        let datos = await fetch('http://localhost:3000/alta', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        });
        let data = await datos.json();
        console.log(data.data);
    } catch (error) {
        console.error(error);
    }
}

const modificarAjax = async (item) => {
    
    try {
        let datos = await fetch('http://localhost:3000/modificar', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        });
        let data = await datos.json();
        console.log(data.data);
    } catch (error) {
        console.error(error);
    }
}

const bajaAjax = async (id) => {
    try {
        let datos = await fetch('http://localhost:3000/baja', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}`
        });
        let data = await datos.json();
        console.log(data.data);
    } catch (error) {
        console.error(error);
    }
}