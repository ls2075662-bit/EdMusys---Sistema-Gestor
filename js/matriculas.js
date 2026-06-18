// ========================================
// VARIÁVEIS
// ========================================

let horariosMatricula = [];

// ========================================
// CARREGAR ALUNOS
// ========================================

function carregarAlunosSelect() {

    const alunos =
    JSON.parse(
        localStorage.getItem("alunos")
    ) || [];

    const select =
    document.getElementById("alunoSelect");

    if (!select) return;

    select.innerHTML =
    '<option value="">Selecione um aluno</option>';

    alunos.forEach(aluno => {

        select.innerHTML += `
            <option value="${aluno.id}">
                ${aluno.nome}
            </option>
        `;

    });

}

// ========================================
// CARREGAR PROFESSORES
// ========================================

function carregarProfessoresSelect() {

    const professores =
    JSON.parse(
        localStorage.getItem("professores")
    ) || [];

    const select =
    document.getElementById("professorSelect");

    if (!select) return;

    select.innerHTML =
    '<option value="">Selecione um professor</option>';

    professores.forEach(professor => {

        select.innerHTML += `
            <option value="${professor.id}">
                ${professor.nome}
            </option>
        `;

    });

}

// ========================================
// QUANDO ESCOLHER PROFESSOR
// ========================================

const professorSelect =
document.getElementById(
    "professorSelect"
);

if (professorSelect) {

    professorSelect.addEventListener(
        "change",
        function () {

            const professorId =
            Number(this.value);

            const professores =
            JSON.parse(
                localStorage.getItem(
                    "professores"
                )
            ) || [];

            const professor =
            professores.find(
                p => p.id === professorId
            );

            const instrumentoSelect =
            document.getElementById(
                "instrumentoSelect"
            );

            if (!instrumentoSelect) {
                return;
            }

            instrumentoSelect.innerHTML =
            '<option value="">Selecione um instrumento</option>';

            if (!professor) {
                return;
            }

            if (!professor.instrumentos) {
                return;
            }

            professor.instrumentos.forEach(
                instrumento => {

                    instrumentoSelect.innerHTML += `
                        <option value="${instrumento}">
                            ${instrumento}
                        </option>
                    `;

                }
            );

        }
    );

}

// ========================================
// QUANDO ESCOLHER INSTRUMENTO
// ========================================

const instrumentoSelect =
document.getElementById(
    "instrumentoSelect"
);

if (instrumentoSelect) {

    instrumentoSelect.addEventListener(
        "change",
        function () {

            const professorId =
            Number(
                document
                .getElementById(
                    "professorSelect"
                )
                .value
            );

            const professores =
            JSON.parse(
                localStorage.getItem(
                    "professores"
                )
            ) || [];

            const professor =
            professores.find(
                p => p.id === professorId
            );

            const horarioSelect =
            document.getElementById(
                "horarioSelect"
            );

            if (!horarioSelect) {
                return;
            }

            horarioSelect.innerHTML =
            '<option value="">Selecione um horário</option>';

            if (!professor) {
                return;
            }

            if (!professor.disponibilidade) {
                return;
            }

            professor.disponibilidade.forEach(
                horario => {

                    horarioSelect.innerHTML += `
                        <option
                            value="${horario.dia}|${horario.horario}"
                        >
                            ${horario.dia} - ${horario.horario}
                        </option>
                    `;

                }
            );

        }
    );

}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarAlunosSelect();

        carregarProfessoresSelect();

    }
);