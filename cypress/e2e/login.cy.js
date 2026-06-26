describe('Testando o site Open Color', () => {
  it('Deve criar uma conta e fazer login com sucesso', () => {
    // ---- PASSO 1: CADASTRO ----
    cy.visit('http://localhost:4000/login.html') 
    cy.get('#link-ir-cadastro').click()

    // Preenche os dados de cadastro
    cy.get('#cad-email').type('teste_robo@exemplo.com')
    cy.get('#cad-senha').type('SenhaForte123')
    cy.get('#cadastroForm > .btn-entrar').click()
    
    // ---- PASSO 2: LOGIN (O robô voltou para a tela de login) ----
    // Agora digitamos os mesmos dados que acabamos de cadastrar!
    cy.get('#login-email').type('teste_robo@exemplo.com')
    cy.get('#login-senha').type('SenhaForte123')
    cy.get('#loginForm > .btn-entrar').click()

    // ---- PASSO 3: VALIDAÇÃO ----
    // Aqui vamos garantir que ele realmente entrou na página principal.
    // O Cypress vai checar se a URL mudou e não contém mais "login.html"
    cy.url().should('not.include', 'login.html')
  })
})