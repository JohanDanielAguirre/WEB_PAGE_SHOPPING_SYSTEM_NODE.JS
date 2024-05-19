let usuarios = [];

const usuario = {
    username: "carlos",
    password: "1234"
};

usuarios.push(usuario);

function login() {
    const useradminname = "admin";
    const useradminpassword = "admin";
    const nameInput = document.getElementById('nameInput');
    const passwordinput = document.getElementById('passwordInput');
    const password = passwordinput.value.trim();
    const name = nameInput.value.trim();

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
    }

    // esto es un usuario que se crea esto se debe cambiar cuando se realize lo de crear usuarios
}

function doubleNumber() {
    const number = parseFloat(numberInput.value);

    if (isNaN(number)) {
        alert('Ingresar un valor numerico!');
    } else {
        const outputDiv = document.getElementById('output');
        const doubledNumber = number * 2;
        outputDiv.textContent = `Doble de ${number} es ${doubledNumber}`;
    }
}