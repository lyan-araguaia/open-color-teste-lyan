/**
 * @jest-environment jsdom
 */

describe("Fluxo Completo do Sistema de Login e Cadastro", () => {
  let blocoLogin, blocoCadastro, caixaErro, caixaSucesso;

  beforeAll(() => {
    // 1. Monta a estrutura HTML exata uma única vez
    document.body.innerHTML = `
      <div id="bloco-login"></div>
      <div id="bloco-cadastro" class="escondido"></div>
      <div id="mensagem-erro" style="display: none;"></div>
      <div id="mensagem-sucesso" style="display: none;"></div>
      
      <a id="link-ir-cadastro" href="#">Cadastro</a>
      <a id="link-ir-login" href="#">Login</a>

      <form id="cadastroForm">
        <input id="cad-email" value="" />
        <input id="cad-senha" value="" />
      </form>

      <form id="loginForm">
        <input id="login-email" value="" />
        <input id="login-senha" value="" />
      </form>
    `;

    // 2. Cria mocks iniciais de ambiente
    localStorage.clear();
    delete window.location;
    window.location = { href: "" };

    // 3. Carrega o script apenas uma vez para fixar as variáveis globais dele no HTML acima
    require("./login-logica.js");

    // Mapeia os elementos para usarmos nos testes
    blocoLogin = document.getElementById("bloco-login");
    blocoCadastro = document.getElementById("bloco-cadastro");
    caixaErro = document.getElementById("mensagem-erro");
    caixaSucesso = document.getElementById("mensagem-sucesso");
  });

  test("1. Deve alternar as telas clicando nos links", () => {
    // Indo para o cadastro
    document.getElementById("link-ir-cadastro").click();
    expect(blocoLogin.classList.contains("escondido")).toBe(true);
    expect(blocoCadastro.classList.contains("escondido")).toBe(false);

    // Voltando para o login
    document.getElementById("link-ir-login").click();
    expect(blocoCadastro.classList.contains("escondido")).toBe(true);
    expect(blocoLogin.classList.contains("escondido")).toBe(false);
  });

  test("2. Deve exibir erro ao tentar logar com credenciais incorretas", () => {
    document.getElementById("login-email").value = "errado@email.com";
    document.getElementById("login-senha").value = "000000";

    document.getElementById("loginForm").dispatchEvent(new Event("submit"));
    expect(caixaErro.innerText).toBe("Email ou senha incorretos.");
    expect(caixaErro.style.display).toBe("block");
  });

  test("3. Deve cadastrar um novo usuário com sucesso", () => {
    document.getElementById("cad-email").value = "lyan@email.com";
    document.getElementById("cad-senha").value = "senha123";

    document.getElementById("cadastroForm").dispatchEvent(new Event("submit"));

    const usuarios = JSON.parse(localStorage.getItem("usuarios_projeto")) || [];
    expect(usuarios.length).toBe(1);
    expect(usuarios[0].email).toBe("lyan@email.com");
    expect(caixaSucesso.innerText).toBe("Cadastro realizado! Faca seu login.");
  });

  test("4. Não deve permitir cadastrar o mesmo e-mail novamente", () => {
    document.getElementById("cad-email").value = "lyan@email.com";
    document.getElementById("cad-senha").value = "outrasenha";

    document.getElementById("cadastroForm").dispatchEvent(new Event("submit"));
    expect(caixaErro.innerText).toBe("Este email ja esta cadastrado!");
  });

  test("5. Deve logar com sucesso usando o usuário que acabamos de cadastrar", () => {
    document.getElementById("login-email").value = "lyan@email.com";
    document.getElementById("login-senha").value = "senha123";

    document.getElementById("loginForm").dispatchEvent(new Event("submit"));
    expect(window.location.href).toBe("/?logado=true");
  });

  test("6. Deve logar com sucesso usando a conta de Admin padrão", () => {
    window.location.href = ""; // limpa o redirecionamento anterior
    document.getElementById("login-email").value = "admin@email.com";
    document.getElementById("login-senha").value = "123456";

    document.getElementById("loginForm").dispatchEvent(new Event("submit"));
    expect(window.location.href).toBe("/?logado=true");
  });
});
