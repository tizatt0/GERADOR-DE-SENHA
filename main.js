// =========================
// ELEMENTOS DO GERADOR
// =========================

const passwordInput =
    document.getElementById("password");

const copyButton =
    document.getElementById("copyButton");

const generateButton =
    document.getElementById("generateButton");

const lengthInput =
    document.getElementById("length");

const lengthValue =
    document.getElementById("lengthValue");

const uppercase =
    document.getElementById("uppercase");

const lowercase =
    document.getElementById("lowercase");

const numbers =
    document.getElementById("numbers");

const symbols =
    document.getElementById("symbols");

const strengthText =
    document.getElementById("strengthText");

const strengthBar =
    document.getElementById("strengthBar");


// =========================
// ELEMENTOS DA IDENTIDADE
// =========================

const aboutTitle =
    document.getElementById("aboutTitle");

const aboutText =
    document.getElementById("aboutText");

const generatorDescription =
    document.getElementById(
        "generatorDescription"
    );


// =========================
// DADOS DAS PROFISSÕES
// =========================

const professions = {

    contadora: {

        title:
            "Proteger o que importa.",

        text:
            "Na Contabilidade, informações financeiras, documentos e dados de clientes precisam de proteção e responsabilidade. Uma senha forte representa uma das primeiras camadas de segurança.",

        description:
            "Crie uma senha forte para proteger informações financeiras."

    },


    biomedica: {

        title:
            "Preservar o que é importante.",

        text:
            "Na Biomedicina, informações relacionadas a pacientes, exames e resultados exigem responsabilidade e cuidado. A segurança digital ajuda a preservar essas informações.",

        description:
            "Crie uma senha forte para proteger informações importantes."

    },


    engenheiro: {

        title:
            "Construir com segurança.",

        text:
            "Na Engenharia, projetos, sistemas, processos e informações técnicas fazem parte do trabalho. A tecnologia precisa ser acompanhada de segurança.",

        description:
            "Crie uma senha forte para proteger sistemas e projetos."

    }

};


// =========================
// SELECIONAR PROFISSÃO
// =========================

const professionButtons =
    document.querySelectorAll(
        ".profession"
    );


professionButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            // Remove o destaque
            // das outras profissões

            professionButtons.forEach(
                item => {
                    item.classList.remove(
                        "active"
                    );
                }
            );


            // Ativa a escolhida

            button.classList.add(
                "active"
            );


            // Descobre qual profissão
            // foi selecionada

            const profession =
                button.dataset.profession;


            const data =
                professions[profession];


            // Atualiza os textos

            aboutTitle.textContent =
                data.title;

            aboutText.textContent =
                data.text;

            generatorDescription.textContent =
                data.description;

        }
    );

});


// =========================
// CARACTERES
// =========================

const characters = {

    uppercase:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

    lowercase:
        "abcdefghijklmnopqrstuvwxyz",

    numbers:
        "0123456789",

    symbols:
        "!@#$%&*+-=?"

};


// =========================
// TAMANHO
// =========================

lengthInput.addEventListener(
    "input",
    () => {

        lengthValue.textContent =
            lengthInput.value;

        generatePassword();

    }
);


// =========================
// GERAR SENHA
// =========================

function generatePassword() {

    let availableCharacters = "";


    // Letras maiúsculas

    if (uppercase.checked) {

        availableCharacters +=
            characters.uppercase;

    }


    // Letras minúsculas

    if (lowercase.checked) {

        availableCharacters +=
            characters.lowercase;

    }


    // Números

    if (numbers.checked) {

        availableCharacters +=
            characters.numbers;

    }


    // Símbolos

    if (symbols.checked) {

        availableCharacters +=
            characters.symbols;

    }


    // Se nenhuma opção estiver marcada

    if (
        availableCharacters.length === 0
    ) {

        passwordInput.value = "";

        strengthText.textContent =
            "-";

        strengthBar.style.width =
            "0%";

        return;
    }


    const length =
        Number(lengthInput.value);


    let password = "";


    // Criando a senha

    for (
        let i = 0;
        i < length;
        i++
    ) {

        const random =
            new Uint32Array(1);


        crypto.getRandomValues(
            random
        );


        const index =
            random[0] %
            availableCharacters.length;


        password +=
            availableCharacters[index];

    }


    passwordInput.value =
        password;


    checkStrength(password);
}


// =========================
// VERIFICAR FORÇA
// =========================

function checkStrength(password) {

    let score = 0;


    // Tamanho

    if (password.length >= 8) {
        score++;
    }


    if (password.length >= 12) {
        score++;
    }


    // Maiúsculas

    if (/[A-Z]/.test(password)) {
        score++;
    }


    // Minúsculas

    if (/[a-z]/.test(password)) {
        score++;
    }


    // Números

    if (/[0-9]/.test(password)) {
        score++;
    }


    // Símbolos

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }


    // =========================
    // RESULTADO
    // =========================

    if (score <= 2) {

        strengthText.textContent =
            "Fraca";

        strengthText.style.color =
            "#ef4444";

        strengthBar.style.width =
            "30%";

        strengthBar.style.background =
            "#ef4444";

    }

    else if (score <= 4) {

        strengthText.textContent =
            "Média";

        strengthText.style.color =
            "#f59e0b";

        strengthBar.style.width =
            "65%";

        strengthBar.style.background =
            "#f59e0b";

    }

    else {

        strengthText.textContent =
            "Forte";

        strengthText.style.color =
            "#22c55e";

        strengthBar.style.width =
            "100%";

        strengthBar.style.background =
            "#22c55e";

    }

}


// =========================
// COPIAR SENHA
// =========================

copyButton.addEventListener(
    "click",
    async () => {

        const password =
            passwordInput.value;


        if (password === "") {
            return;
        }


        try {

            await navigator.clipboard
                .writeText(password);


            copyButton.textContent =
                "✅";


            setTimeout(
                () => {

                    copyButton.textContent =
                        "📋";

                },
                1500
            );

        }

        catch (error) {

            alert(
                "Não foi possível copiar a senha."
            );

        }

    }
);


// =========================
// BOTÃO GERAR
// =========================

generateButton.addEventListener(
    "click",
    generatePassword
);


// =========================
// ATUALIZAR QUANDO
// MUDAR AS OPÇÕES
// =========================

uppercase.addEventListener(
    "change",
    generatePassword
);

lowercase.addEventListener(
    "change",
    generatePassword
);

numbers.addEventListener(
    "change",
    generatePassword
);

symbols.addEventListener(
    "change",
    generatePassword
);


// =========================
// GERAR AO ABRIR
// =========================

generatePassword();
