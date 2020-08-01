const post = document.getElementById('new-post');
const divForm = document.getElementById('div-form');
let admin = localStorage.length ? localStorage.getItem("mail") : "";
let auxForm = `<form id="form" class="div-form">
        <h1 class="nuevoPostTitle" >Escribe un nuevo Post</h1> 
        <hr class="separadorNewPost">
        <h3 class="lblNewPost">Post title</h3>
        <input type="text" name="title" class="txtNewPost"/>
        <h3 class="lblNewPost">Post Header</h3>
        <input type="text" name="header" class="txtNewPost"/>
        <h3 class="lblNewPost">Post Text</h3>
        <textarea name="text" cols="30" rows="10" class="txtNewPost txtContenido"></textarea>
        <hr class="separadorNewPost">
        <button type="submit" id="submit" class="btnPostear">Post</button>
        </form>`;
let spin = `<img  class="imgLoading" src="../../assets/InternetSlowdown_Day.gif" alt="no foto" height="42" width="42">`;


post.addEventListener('click', (e) => {

    if (admin) {
        divForm.innerHTML = auxForm;
        let form = document.getElementById('form');

        form.onsubmit = (e) => {
            e.preventDefault();

            let xhr = new XMLHttpRequest();
            let datosPost = {
                title: e.target[0].value,
                header: e.target[1].value,
                posttext: e.target[2].value,
                author: admin
            }
            if (validarPost(datosPost)) {
                divForm.innerHTML = spin;
                xhr.open("post", "http://localhost:1337/postearNuevaEntrada", true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.type === "error") {
                            console.log("Error en el servidor");
                        }
                        else {
                            if (response.date) {
                                console.log("entro en el servidor");
                                divForm.innerHTML = "";
                                let post = `<article class="article">
                                                <h2 class="titlePost">${response.title}</h2>   
                                                <h3 class="headerPost">${response.header}</h3>
                                                <h4 class="postedBy">Posted by ${response.author} on ${response.date}</h4>
                                                <p class="textoPost">${response.posttext}</p>
                                                <hr class="hrPost">
                                            </article>`;
                                document.getElementById("SeccionPosts").innerHTML += post;
                            }
                        }
                    }
                }
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(datosPost));
            }
        }
    }
})

const validarPost = (datosPost) => {
    if (datosPost.title === "" || datosPost.header === "" || datosPost.posttext === "") {
        alert("ERROR: Debe llenar los campos.");
        return false;
    }
    return true;
}


/*No se usarla
const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
*/