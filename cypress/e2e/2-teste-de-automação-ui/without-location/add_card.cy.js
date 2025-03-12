describe('Fluxo 2: Cadastro de Cartão de Crédito e Finalização de Compra', () => {

  // Teste 1: Visitar plataforma
  it('Visitar plataforma', () => {
    /**
     * 
     * Cenário: O usuário acessa a plataforma para explorar o cardápio e adicionar produtos ao carrinho.
     * 
     * Expectativa:
     * - A plataforma deve ser acessada corretamente e carregar a página inicial.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: O teste valida a experiência do usuário ao acessar a plataforma e não foca no funcionamento interno da aplicação.
     * 
     */
    cy.visit('/');
    cy.wait(2000);
  });

  // Teste 2: Verificar se o usuário está na página correta
  it('Verifica se o usuário está na página correta', () => {
    /**
     * 
     * Cenário: Validar se o usuário foi redirecionado corretamente para a página de entrega.
     * 
     * Expectativa:
     * - A URL deve conter '/delivery', indicando que o usuário está na página de entrega.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: O teste valida a navegação da plataforma sem focar na implementação interna.
     * 
     */
    cy.url().should('include', '/delivery');
  });

  // Teste 3: Simular a inserção manual do endereço
  it('Simula a inserção manual do endereço', () => {
    /**
     * 
     * Cenário: O usuário insere manualmente um endereço de entrega.
     * 
     * Expectativa:
     * - O campo de endereço deve ser preenchido corretamente e o endereço deve ser selecionado.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: O teste valida apenas a funcionalidade da interface de entrada de endereço sem entender o funcionamento interno.
     * 
     */
    cy.get('.loading-container', { timeout: 40000 }).should('not.exist');
    cy.get('input.search-address-input', { timeout: 40000 })
      .should('be.visible')
      .clear()
      .type('Brasília - Distrito Federal, Brasil');

    cy.get('create-address-list-item')
      .eq(1)
      .click();
  });

  // Teste 4: Selecionar a seção Entradas e escolher Camarão à milanesa
  it('Seleciona a seção Entradas e escolhe Camarão à milanesa', () => {
    /**
     * 
     * Cenário: O usuário escolhe um item do cardápio e adiciona ao carrinho.
     * 
     * Expectativa:
     * - O item "Camarão à milanesa com gergelim" deve ser selecionado e adicionado ao carrinho.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: O teste valida a interação do usuário com o cardápio e a adição de um item no carrinho, sem detalhes
     * internos da implementação.
     * 
     */
    cy.contains('div.section-item', 'Entradas', { timeout: 30000 })
      .should('be.visible')
      .click({ force: true });

    cy.wait(3000); 

    cy.contains('span.item-description', 'Camarão à milanesa com gergelim', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.wait(2000);

    cy.get('textarea[formcontrolname="textInput"]')
      .scrollIntoView()
      .should('be.visible')
      .type('Por favor, retirar o gergelim e servir o molho tártaro à parte.');

    cy.get('div.button-submit-content')
      .contains('ADICIONAR')
      .click();

    cy.wait(4000); 
    cy.get('div.image-container') // Seletor do container de imagem
      .find('ion-icon[name="add"]')
      .click();

    cy.wait(5000);
    cy.get('div.tip-option')
      .contains('span', 'R$ 0')
      .click();
  });

  // Teste 5: Preencher e cadastrar cartão de crédito
  it('Preenche os dados e cadastra o cartão de crédito', () => {
    /**
     * 
     * Cenário: O usuário preenche os dados do cartão de crédito e realiza a confirmação.
     * 
     * Expectativa:
     * - O usuário deve conseguir preencher os dados corretamente e salvar o cartão de crédito.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: O teste valida a experiência do usuário ao preencher os dados do cartão e finaliza o pagamento.
     * 
     */
    cy.wait(3000);
    cy.contains('span', 'SELECIONE FORMA DE PAGAMENTO')
      .should('be.visible')
      .click();

    cy.wait(1000);
    cy.get('span.add-button-label')
      .click();

    cy.contains('span.card-payment-label', 'Crédito').click();

    cy.get('#cardNumber')
      .type(Cypress.env('card_number'));

    cy.get('#cc-exp-date')
      .type(Cypress.env('expiration_date'));

    cy.get('#cvv')
      .type(Cypress.env('cvv'));

    cy.get('input.native-input.sc-ion-input-md[id="ion-input-0"]')
      .type(Cypress.env('test_code'));

    cy.get('#cpfCnpj')
      .type(Cypress.env('cpf'));

    // Preencher o campo com o número de telefone
    /*cy.get('input#phone_number')
    .type(Cypress.env('phone'));*/
    
    // Preencher o campo do nome do cartão
    /*cy.xpath('//*[@id="ion-input-1"]')
    .type(Cypress.env('card_name'));*/

    /*cy.get('button.is-primary')
    .click();*/

    cy.xpath('//*[@class="is-primary" and text()="SALVAR"]')
      .click();
  });

});