const form = document.getElementById('form');

/**
 * Obtengo los valores del formulario de login
 */
form.onsubmit = (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let datosLogin = {
        email: e.target[0].value,
        password: e.target[1].value
    }

    if (validarLogin(datosLogin)) {
        xhr.open("post", "http://localhost:1337/login", true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                
                let response = JSON.parse(xhr.responseText);
                if (response.type === "error") {
                    console.log("No anda");
                }
                else {
                    //localStorage.setItem("response",xhr.responseText);//setea Key:value
                    //window.location.replace(`file:///C:/Users/Ignacio/Downloads/PP-JS/modelo-PP/ui/paginas/index.html?${response.email}&${response.password}&${response.id}`)
                    //window.location='https://www.google.com.ar';
                    //localStorage.clear(); //limpia el localstorage;
                    if(response.autenticado === "si"){
                        localStorage.setItem("preferencias",xhr.responseText);
                        localStorage.setItem("mail",datosLogin.email);
                        console.log("Preferencias seteadas"); 
                        window.open(`./index.html`, "_self");//redireccionar 
                    }                  
                }           
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(datosLogin));
    }
    
}

const validarLogin = (datosLogin) => {
    if (datosLogin.email === '' || datosLogin.password === '') {
        alert("ERROR: Debe llenar los campos.");
        return false;
    }
    return true;
}
