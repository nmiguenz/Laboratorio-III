import Persona from './entidades.js';

let btnTraer = document.getElementById('btnTraer');
let btnTraerF = document.getElementById('btnTraerF');
let btnBaja = document.getElementById('btnBaja');
let info = document.getElementById('info');


let img = document.createElement('img');
img.setAttribute('src','./imagenes/spinner.gif');
img.setAttribute('alt', 'spinner');

//Tengo todos los formularios como un array
let formulario = document.forms[0];

formulario.onsubmit = (e)=>{
    e.preventDefault();
    
    let nombre = document.getElementsByName('nombre')[0].value;
    let apellido = document.getElementById('txtApellido').value;
    let edad = parseInt(document.getElementsByName('edad')[0].value);

    let newPersona = new Persona(null,nombre,apellido,edad);

    altaPersonaFetch(newPersona);
}

// Lo que le paso con saludar es la referencia a la funcion
//Manejadores semanticos, si le asigno mas de un manejador, solo puede manejar el ultimo en la linea de codigo
//btnTraer.onclick = saludar;

//btnTraer.onclick = despedir;

// btnTraer.onclick = ()=>{
//     console.log('Esto es un manejador arrow function');
// }

//Cuando se quiere agregar mas de un manejador uso arrow function
// btnTraer.addEventListener('click', saludar);
// btnTraer.addEventListener('click', despedir);
// btnTraer.addEventListener('click', ()=>{
//     console.log('Esto es un manejador arrow function');
//     console.log(event);
//     });

// function saludar(){
//     console.log('Hola Mundo');

//     console.log(event);
// }

// function despedir(){
//     console.log('Chau');
//     console.log(event);
// }

btnTraer.addEventListener('click', traerPersonas);

function traerPersonas(){
    let xhr = new XMLHttpRequest();
    let img = document.createElement('img');
    img.setAttribute('src','./imagenes/spinner.gif');
    img.setAttribute('alt', 'spinner');
    
    //Es el manejador de eventos
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            info.removeChild(img);
            if(xhr.status == 200){
                console.log(JSON.parse(xhr.responseText));

                //Muestro a la persona en un parrafo
                let listaPersonas = JSON.parse(xhr.responseText);
                info.innerHTML = `<p>id: ${listaPersonas[0].id} nombre: ${listaPersonas[0].nombre} apellido:${listaPersonas[0].apellido}</p>`;
            }
            else{
                console.log(xhr.status + " " + xhr.statusText);
            } 
        }
        else{
            info.appendChild(img);
        }
    }

    xhr.open('GET', 'http://localhost:3000/traerPersonas', true)
    xhr.send();
}

function altaPersona(persona){

    let xhr = new XMLHttpRequest();

    let img = document.createElement('img');
    img.setAttribute('src','./imagenes/spinner.gif');
    img.setAttribute('alt', 'spinner');
    
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            info.removeChild(img);
            if(xhr.status == 200){
                
                console.log(JSON.parse(xhr.responseText));
            }
            else{
                console.log(xhr.status + " " + xhr.statusText);
            } 
        }
        else{
            info.appendChild(img);
        } 

    }
    xhr.open('POST', 'http://localhost:3000/altaPersona');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(persona));
}

//Igual al alta
//funcion modificarPersona();

btnBaja.addEventListener('click', ()=>{
    let id = parseInt(document.querySelector('#txtId').value);
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange =()=>{
        if(xhr.readyState == 4){
            
            if(xhr.status == 200){
                
                console.log(JSON.parse(xhr.responseText));
            }
            else{
                console.log(xhr.status + " " + xhr.statusText);
            } 
        }
    }
    xhr.open('POST', 'http://localhost:3000/bajaPersona');
    
    //Le paso un dato como si se lo hubiesemos extraido del formulario 
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //Si mando mas de una variable
    //xhr.send(`id=${id}&nombre=`);
    xhr.send(`id=${id}`);
})

// btnTraerF.addEventListener('click', traerPersonasFetch);

// function traerPersonasFetch(){

//     //Devuelve una promesa
//     fetch('');
// }

function altaPersonaFetch(per){
    info.appendChild(img);
    fetch('http://localhost:3000/altaPersona',{
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(per)
    })
    .then(res =>res.json())
    .then(res=>{
        console.log(res)
        info.removeChild(img)
    })
    .catch(error=>console.log(error));
}