const usuario =
JSON.parse(
    localStorage.getItem("usuarioLogado")
);

if(!usuario){

    window.location.href =
    "index.html";

}

document.getElementById("nomeAdmin")
.textContent = usuario.nome;

const professores =
JSON.parse(
localStorage.getItem("professores")
) || [];

const alunos =
JSON.parse(
localStorage.getItem("alunos")
) || [];

const matriculas =
JSON.parse(
localStorage.getItem("matriculas")
) || [];

document.getElementById(
"totalProfessores"
).textContent =
professores.length;

document.getElementById(
"totalAlunos"
).textContent =
alunos.length;

document.getElementById(
"totalMatriculas"
).textContent =
matriculas.length;

document.getElementById(
"logoutBtn"
).addEventListener(
"click",
function(){

    localStorage.removeItem(
        "usuarioLogado"
    );

    window.location.href =
    "index.html";

});