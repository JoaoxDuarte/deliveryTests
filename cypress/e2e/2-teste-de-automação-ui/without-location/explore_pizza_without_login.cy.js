describe('Fluxo 2: Exploração do Cardápio (de pizzas) e Adição ao Carrinho', () => {

  // Teste 1: Visitar plataforma
  it('Visitar a plataforma', () => {
    /**
     * 
     * Cenário: O usuário visita a página inicial do site de delivery.
     * 
     * Expectativa:
     * - A página inicial deve carregar corretamente e permitir o acesso ao conteúdo.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: Pois estamos testando o comportamento da aplicação básico ao carregar a página inicial.
     */
    cy.visit('/'); 
    cy.wait(2000);
  });

  // Teste 2: Verifica se o usuário está na página correta
  it('Verifica se o usuário está na página correta', () => {
    /**
     * 
     * Cenário: O usuário acessa a página de delivery após visitar a plataforma.
     * 
     * Expectativa:
     * - O URL da página deve incluir '/delivery'.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: ver se o usuário está na página certa.
     */
    cy.url().should('include', '/delivery');
  });

  // Teste 3: Simula a localização de Brasília - Distrito Federal, Brasil
  // OBS: Deve estar com a localização do navegador DESLIGADA 
  it('Simula a localização de Brasília - Distrito Federal, Brasil', () => {
    /**
     * 
     * Cenário: O usuário informa uma localização (Brasília - Distrito Federal) na plataforma.
     * 
     * Expectativa:
     * - A plataforma deve aceitar e processar o endereço fornecido, removendo o carregamento e permitindo a seleção do endereço.
     * 
     * Técnica de Teste:
     * - Caixa Preta: há apenas interação básica.
     * 
     */
    cy.get('.loading-container', { timeout: 40000 }).should('not.exist'); 
    cy.get('input.search-address-input', { timeout: 40000 }) 
      .should('be.visible') 
      .type('Brasília - Distrito Federal, Brasil'); 

    cy.get('create-address-list-item') 
      .eq(1)
      .click();
  });

  // Teste 4: Simula o acesso ao cardápio da pizzaria e adiciona um item ao carrinho
  it.only('Simula o acesso ao cardápio da pizzaria e adiciona um item ao carrinho', () => {
    /**
     * 
     * Cenário: O usuário acessa o cardápio da pizzaria "Coco Bambu" e adiciona itens ao carrinho.
     * 
     * Expectativa:
     * - O usuário deve conseguir acessar o cardápio da pizzaria, selecionar os itens desejados e adicionar ao carrinho.
     * 
     * Técnica de Teste:
     * - Caixa Preta: O teste valida o comportamento da plataforma ao realizar uma sequência de seleções e interações com o cardápio.
     * 
     */
    cy.contains('span.name', 'Coco Bambu Pizzaria', { timeout: 10000 })
      .should('be.visible')
      .click(); 

    cy.contains('span.item-name', 'Pizza Tradicional Grande')
      .should('be.visible')
      .click();

    cy.contains('span.subitem-name', 'Alho frito')
      .scrollIntoView()
      .click();

    cy.contains('span.subitem-name', 'Bacon')
      .scrollIntoView()
      .click(); 

    // Coloca a observação do pedido
    cy.get('textarea[formcontrolname="textInput"]') 
      .scrollIntoView() 
      .type('Por favor, retirar a cebola e colocar o molho à parte. Se possível, cortar em 8 fatias.'); 



    cy.contains('button', 'Você não está logado. Clique aqui e logue para poder adicionar um item à sacola.')
      .click(); 

    // Realiza o cadastro 
    // cy.realizarCadastro();

    // Realiza o login com a função do commands.js
    cy.realizarLogin();



    // Repetir processo de seleção da pizza -> POIS APÓS FAZER O LOGIN, O CARRINHO É LIMPO
    // E É PRECISO FAZER TODO PROCESSO OUTRA VEZ
    cy.contains('span.name', 'Coco Bambu Pizzaria', { timeout: 10000 }).click(); 
    cy.contains('span.item-name', 'Pizza Tradicional Grande').click(); 
    cy.contains('span.subitem-name', 'Alho frito').scrollIntoView().click();
    cy.contains('span.subitem-name', 'Bacon').scrollIntoView().click();

    // O teste é feito para não ir até o pagamento
  });
});
