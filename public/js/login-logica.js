var blocoLogin = document.getElementById("bloco-login");
var blocoCadastro = document.getElementById("bloco-cadastro");
var caixaErro = document.getElementById("mensagem-erro");
var caixaSucesso = document.getElementById("mensagem-sucesso");

document
  .getElementById("link-ir-cadastro")
  .addEventListener("click", function (e) {
    e.preventDefault();
    caixaErro.style.display = "none";
    caixaSucesso.style.display = "none";
    blocoLogin.classList.add("escondido");
    blocoCadastro.classList.remove("escondido");
  });

document
  .getElementById("link-ir-login")
  .addEventListener("click", function (e) {
    e.preventDefault();
    caixaErro.style.display = "none";
    caixaSucesso.style.display = "none";
    blocoCadastro.classList.add("escondido");
    blocoLogin.classList.remove("escondido");
  });

document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    caixaErro.style.display = "none";
    caixaSucesso.style.display = "none";

    var email = document.getElementById("cad-email").value.trim();
    var senha = document.getElementById("cad-senha").value;

    var usuarios = JSON.parse(localStorage.getItem("usuarios_projeto")) || [];

    var usuarioExiste = false;
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === email) {
        usuarioExiste = true;
        break;
      }
    }

    if (usuarioExiste) {
      caixaErro.innerText = "Este email ja esta cadastrado!";
      caixaErro.style.display = "block";
      return;
    }

    usuarios.push({ email: email, senha: senha });
    localStorage.setItem("usuarios_projeto", JSON.stringify(usuarios));

    caixaSucesso.innerText = "Cadastro realizado! Faca seu login.";
    caixaSucesso.style.display = "block";

    document.getElementById("cadastroForm").reset();
    blocoCadastro.classList.add("escondido");
    blocoLogin.classList.remove("escondido");
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    caixaErro.style.display = "none";
    caixaSucesso.style.display = "none";

    var emailDigitado = document.getElementById("login-email").value.trim();
    var senhaDigitada = document.getElementById("login-senha").value;

    var usuarios = JSON.parse(localStorage.getItem("usuarios_projeto")) || [];

    if (emailDigitado === "admin@email.com" && senhaDigitada === "123456") {
      window.location.href = "https://yeun.github.io/open-color/";
      return;
    }

    var contaValida = null;
    for (var j = 0; j < usuarios.length; j++) {
      if (
        usuarios[j].email === emailDigitado &&
        usuarios[j].senha === senhaDigitada
      ) {
        contaValida = usuarios[j];
        break;
      }
    }

    if (contaValida) {
      window.location.href = "https://yeun.github.io/open-color/";
    } else {
      caixaErro.innerText = "Email ou senha incorretos.";
      caixaErro.style.display = "block";
    }
  });
