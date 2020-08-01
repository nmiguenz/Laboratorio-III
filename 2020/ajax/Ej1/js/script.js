let imagenes = [
    {
        title: "Tecnologia",
        origen: "https://placeimg.com/200/200/tech"
    },
    {
        title: "Animales",
        origen: "https://placeimg.com/200/200/animals"
    },
    {
        title: "Naturaleza",
        origen: "https://placeimg.com/200/200/nature"
    },
    {
        title: "Arquitectura",
        origen: "https://placeimg.com/200/200/architecture"
    },
    {
        title: "Personas",
        origen: "https://placeimg.com/200/200/people"
    },
    {
        title: "Azar",
        origen: "https://placeimg.com/200/200/any"
    },
]

//Aca apunto al contenido de la plantilla
let plantilla = document.getElementsByTagName('template')[0].content;

let fragmento = document.createDocumentFragment();
let div = document.getElementById('divImagenes');

imagenes.forEach(elemento=>{
    
    // querySelector se hace cuando me quiero traer algo especifico
    plantilla.querySelector('img').setAttribute('src', elemento.origen);
    plantilla.querySelector('img').setAttribute('alt', elemento.title);
    plantilla.querySelector('figcaption').textContent = elemento.title;
    plantilla.querySelector('figure').setAttribute('style', 'display:inline-block');

    //Quiero lo que le estoy apuntando mas todos los hijos
    let copia = document.importNode(plantilla, true);
    fragmento.appendChild(copia);

});

div.appendChild(fragmento);