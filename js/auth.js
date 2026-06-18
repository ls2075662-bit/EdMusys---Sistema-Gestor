// cria administrador padrão

function iniciarSistema(){

    const admin = localStorage.getItem("admin");

    if(!admin){

        localStorage.setItem(
            "admin",
            JSON.stringify({
                nome:"Administrador",
                email:"admin@educacaomusical.com",
                senha:"admin123",
                tipo:"admin"
            })
        );

    }

    if(!localStorage.getItem("professores")){
        localStorage.setItem(
            "professores",
            JSON.stringify([])
        );
    }

    if(!localStorage.getItem("alunos")){
        localStorage.setItem(
            "alunos",
            JSON.stringify([])
        );
    }

    if(!localStorage.getItem("matriculas")){
        localStorage.setItem(
            "matriculas",
            JSON.stringify([])
        );
    }

}

iniciarSistema();

const loginForm =
document.getElementById("loginForm");

loginForm.addEventListener(
"submit",
function(e){

    e.preventDefault();

    const email =
    document.getElementById("email").value;

    const senha =
    document.getElementById("senha").value;

    const admin =
    JSON.parse(
        localStorage.getItem("admin")
    );

    if(
        email === admin.email &&
        senha === admin.senha
    ){

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(admin)
        );

        window.location.href =
        "admin.html";

        return;
    }

    alert("Usuário ou senha inválidos.");

});