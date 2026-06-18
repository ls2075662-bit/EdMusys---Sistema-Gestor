// ========================================
// PROTEÇÃO DE ACESSO
// ========================================

const usuario = JSON.parse(
    localStorage.getItem("usuarioLogado")
);

if (!usuario) {
    window.location.href = "index.html";
}

// ========================================
// VARIÁVEIS
// ========================================

let alunoEditando = null;

// ========================================
// CADASTRAR / EDITAR ALUNO
// ========================================

document
.getElementById("alunoForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const aluno = {

        id: alunoEditando || Date.now(),

        nome:
        document.getElementById("nome").value.trim(),

        cpf:
        document.getElementById("cpf").value.trim(),

        telefone:
        document.getElementById("telefone").value.trim(),

        responsavel:
        document.getElementById("responsavel").value.trim(),

        email:
        document.getElementById("email").value.trim(),

        senha:
        document.getElementById("senha").value,

        // Preparação para futuras funcionalidades
        matriculas: []

    };

    const alunos =
    JSON.parse(
        localStorage.getItem("alunos")
    ) || [];

    // =====================
    // VALIDA CPF
    // =====================

    const cpfExistente =
    alunos.find(a =>

        a.cpf === aluno.cpf &&

        a.id !== aluno.id

    );

    if(cpfExistente){

        alert(
            "Já existe um aluno com este CPF."
        );

        return;
    }

    // =====================
    // VALIDA EMAIL
    // =====================

    const emailExistente =
    alunos.find(a =>

        a.email === aluno.email &&

        a.id !== aluno.id

    );

    if(emailExistente){

        alert(
            "Já existe um aluno com este e-mail."
        );

        return;
    }

    // =====================
    // EDITA OU CADASTRA
    // =====================

    const index =
    alunos.findIndex(
        a => a.id === aluno.id
    );

    if(index >= 0){

        // mantém futuras matrículas
        aluno.matriculas =
        alunos[index].matriculas || [];

        alunos[index] = aluno;

    }else{

        alunos.push(aluno);

    }

    localStorage.setItem(
        "alunos",
        JSON.stringify(alunos)
    );

    alert("Aluno salvo com sucesso!");

    this.reset();

    alunoEditando = null;

    carregarAlunos();

});

// ========================================
// LISTAR ALUNOS
// ========================================

function carregarAlunos(){

    const alunos =
    JSON.parse(
        localStorage.getItem("alunos")
    ) || [];

    const pesquisa =
    document.getElementById(
        "pesquisaAluno"
    )?.value.toLowerCase() || "";

    const lista =
    document.getElementById(
        "alunosLista"
    );

    lista.innerHTML = "";

    alunos
    .filter(a =>

        a.nome
        .toLowerCase()
        .includes(pesquisa)

        ||

        a.email
        .toLowerCase()
        .includes(pesquisa)

        ||

        a.cpf
        .includes(pesquisa)

    )
    .forEach(a => {

        lista.innerHTML += `

        <div class="professor-card">

            <h3>${a.nome}</h3>

            <p>
                <strong>CPF:</strong>
                ${a.cpf}
            </p>

            <p>
                <strong>Email:</strong>
                ${a.email}
            </p>

            <p>
                <strong>Telefone:</strong>
                ${a.telefone}
            </p>

            <p>
                <strong>Responsável:</strong>
                ${a.responsavel || "Não informado"}
            </p>

            <div class="acoes">

                <button
                    onclick="editarAluno(${a.id})"
                >
                    Editar
                </button>

                <button
                    onclick="excluirAluno(${a.id})"
                >
                    Excluir
                </button>

            </div>

        </div>

        `;

    });

}

// ========================================
// EDITAR
// ========================================

function editarAluno(id){

    const alunos =
    JSON.parse(
        localStorage.getItem("alunos")
    ) || [];

    const aluno =
    alunos.find(
        a => a.id === id
    );

    if(!aluno){
        return;
    }

    alunoEditando = aluno.id;

    document.getElementById(
        "nome"
    ).value = aluno.nome;

    document.getElementById(
        "cpf"
    ).value = aluno.cpf;

    document.getElementById(
        "telefone"
    ).value = aluno.telefone;

    document.getElementById(
        "responsavel"
    ).value = aluno.responsavel;

    document.getElementById(
        "email"
    ).value = aluno.email;

    document.getElementById(
        "senha"
    ).value = aluno.senha;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// ========================================
// EXCLUIR
// ========================================

function excluirAluno(id){

    const confirmar =
    confirm(
        "Deseja realmente excluir este aluno?"
    );

    if(!confirmar){
        return;
    }

    let alunos =
    JSON.parse(
        localStorage.getItem("alunos")
    ) || [];

    alunos =
    alunos.filter(
        a => a.id !== id
    );

    localStorage.setItem(
        "alunos",
        JSON.stringify(alunos)
    );

    carregarAlunos();

}

// ========================================
// PESQUISA
// ========================================

const pesquisaAluno =
document.getElementById(
    "pesquisaAluno"
);

if(pesquisaAluno){

    pesquisaAluno.addEventListener(
        "input",
        carregarAlunos
    );

}

// ========================================
// LOGOUT
// ========================================

const logoutBtn =
document.getElementById(
    "logoutBtn"
);

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        function(){

            localStorage.removeItem(
                "usuarioLogado"
            );

            window.location.href =
            "index.html";

        }
    );

}

// ========================================
// INICIALIZAÇÃO
// ========================================

carregarAlunos();