
// Formulário de Login do AutoVendas

const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const mensagem = document.getElementById("login-message");

        mensagem.textContent = "";
        mensagem.classList.remove("visible");

        if (!email || !senha) {
            mensagem.textContent = "Preencha todos os campos.";
            mensagem.classList.add("visible");
            return;
        }

        mensagem.textContent =
            "Esta é uma tela demonstrativa. A autenticação será conectada ao backend em uma próxima etapa.";

        mensagem.classList.add("visible");
    });
}

// Recuperação de senha

const forgotPassword = document.getElementById("forgot-password");

if (forgotPassword) {
    forgotPassword.addEventListener("click", function (event) {
        event.preventDefault();

        alert("A recuperação de senha será implementada em uma próxima etapa.");
    });
}
