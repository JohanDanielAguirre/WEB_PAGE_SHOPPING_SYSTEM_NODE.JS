let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];


function login() {
    const useradminname = "admin";
    const useradminpassword = "admin";
    const nameInput = document.getElementById('nameInput');
    const passwordinput = document.getElementById('passwordInput');
    const password = passwordinput.value.trim();
    const name = nameInput.value.trim();
    console.log(usuarios.length)
    if (name === '') {
        alert('Ingrese su nombre!');
    } else if(password === ''){
        alert('Ingrese su contraseña!');
    }else if (useradminname === name && useradminpassword === password) {
            alert('Bienvenido Admin!');
            window.location.href = 'admin.html';
    }else if (usuarios.find(usuario => usuario.username === name && usuario.password === password)) {
        alert('Bienvenido usuario!' + name);
        window.location.href = 'user.html';
    }else{
        alert('Usuario y/o contraseña incorrecto/s');
    }
}

function validarFormulario() {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    const name = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById("confirmar_contrasena").value;

    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden");
    } else if (usuarios.some(usuario => usuario.username === name)) {
        alert("El nombre de usuario ya está en uso");
    }else if(name=="" || contrasena=="" || confirmarContrasena==""){
        alert("Ningún campo debe estar vacío")
    }else {
        const nuevoUsuario = {
            username: name,
            password: contrasena
        };
        console.log(nuevoUsuario);
        usuarios.push(nuevoUsuario);
        console.log(usuarios.length);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert("Formulario enviado correctamente!");
        window.location.href = 'login.html';
    }
}