let professorEditando = null;

let horariosProfessor = [];

const listaHorarios =
document.getElementById(
"listaHorarios"
);

document.getElementById(
"addHorario"
).addEventListener(
"click",
function(){

    const dia =
    document.getElementById("dia").value;

    const horario =
    document.getElementById("horario").value;

    horariosProfessor.push({
        dia,
        horario
    });

    renderHorarios();

});

function renderHorarios(){

    listaHorarios.innerHTML = "";

    horariosProfessor.forEach(h=>{

        listaHorarios.innerHTML += `
            <p>
            ${h.dia} - ${h.horario}
            </p>
        `;

    });

}

document.getElementById(
"professorForm"
).addEventListener(
"submit",
function(e){

    e.preventDefault();

    const instrumentos =
    [...document.querySelectorAll(
        ".checkbox-group input:checked"
    )].map(i=>i.value);

    const professor = {

    id: professorEditando || Date.now(),

    nome: document.getElementById("nome").value,

    cpf: document.getElementById("cpf").value,

    telefone: document.getElementById("telefone").value,

    email: document.getElementById("email").value,

    senha: document.getElementById("senha").value,

    instrumentos,

    disponibilidade: horariosProfessor

};

    const professores =
    JSON.parse(
        localStorage.getItem(
            "professores"
        )
    ) || [];

    const index =
professores.findIndex(
    p => p.id === professor.id
);

if(index >= 0){

    professores[index] = professor;

}else{

    professores.push(professor);

}

    localStorage.setItem(
        "professores",
        JSON.stringify(professores)
    );

    alert(
        "Professor cadastrado!"
    );

    this.reset();

    professorEditando = null;

    horariosProfessor = [];

    renderHorarios();

    carregarProfessores();

});

function carregarProfessores(){

    const professores =
    JSON.parse(
        localStorage.getItem("professores")
    ) || [];

    const lista =
    document.getElementById("professoresLista");

    const pesquisa =
    document.getElementById("pesquisaProfessor")
    ?.value.toLowerCase() || "";

    lista.innerHTML = "";

    professores
    .filter(p =>

    p.nome.toLowerCase().includes(pesquisa)

    ||

    p.email.toLowerCase().includes(pesquisa)

    ||

    p.cpf.includes(pesquisa)

)
    .forEach(p=>{

        lista.innerHTML += `

        <div class="professor-card">

            <h3>${p.nome}</h3>

            <p>Email: ${p.email}</p>

            <p>CPF: ${p.cpf}</p>

            <p>
                Instrumentos:
                ${p.instrumentos.join(", ")}
            </p>

            <div class="acoes">

                <button onclick="editarProfessor(${p.id})">
                    Editar
                </button>

                <button onclick="excluirProfessor(${p.id})">
                    Excluir
                </button>

            </div>

        </div>

        `;
    });
}

carregarProfessores();

document
.getElementById(
"pesquisaProfessor"
)
.addEventListener(
"input",
carregarProfessores
);

function excluirProfessor(id){

    if(
        !confirm(
            "Deseja excluir este professor?"
        )
    ){
        return;
    }

    let professores =
    JSON.parse(
        localStorage.getItem(
            "professores"
        )
    ) || [];

    professores =
    professores.filter(
        p => p.id !== id
    );

    localStorage.setItem(
        "professores",
        JSON.stringify(professores)
    );

    carregarProfessores();

}

function editarProfessor(id){

    const professores =
    JSON.parse(
        localStorage.getItem("professores")
    ) || [];

    const professor =
    professores.find(
        p => p.id === id
    );

    if(!professor){
        return;
    }

    professorEditando = professor.id;

    document.getElementById("nome").value =
    professor.nome;

    document.getElementById("cpf").value =
    professor.cpf;

    document.getElementById("telefone").value =
    professor.telefone;

    document.getElementById("email").value =
    professor.email;

    document.getElementById("senha").value =
    professor.senha;

    horariosProfessor =
    professor.disponibilidade || [];

    renderHorarios();
}
