describe('Fluxo 2: Exploração do Cardápio e Adição ao Carrinho', () => {

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

  // Teste 2: Verifica se o usuário está na página correta
  it('Verifica se o usuário está na página correta', () => {
    /**
     * 
     * Cenário: Validar se o usuário foi redirecionado corretamente para a página de entrega.
     * 
     * Expectativa:
     * - A URL deve conter '/delivery', indicando que o usuário está na página de entrega.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: Essa erapa só valida a navegação da plataforma.
     * 
     */
    cy.url().should('include', '/delivery'); 
  });

  // Teste 3: Simula a localização de Brasília - Distrito Federal, Brasil
  // OBS: a localização do navegador deve estar DESATIVADA
  it('Simula a localização de Brasília - Distrito Federal, Brasil', () => {
    /**
     * 
     * Cenário: O usuário simula a busca e seleção de um endereço manualmente.
     * 
     * Expectativa:
     * - O campo de endereço deve ser preenchido corretamente e o endereço selecionado.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: Tem apenas a interação do usuário com o campo de busca de endereço sem se preocupar com outros detalhes maiores.
     * 
     */
    cy.get('.loading-container', { timeout: 40000 }).should('not.exist'); // Aguarda o carregamento
    cy.get('input.search-address-input', { timeout: 40000 })
      .should('be.visible')
      .type('Brasília - Distrito Federal, Brasil');

    cy.get('create-address-list-item').eq(1).click(); // Seleciona o item
  });

  // Teste 4: Seleciona a seção Entradas e escolhe Camarão à milanesa
  it('Seleciona a seção Entradas e escolhe Camarão à milanesa', () => {
    /**
     * 
     * Cenário: O usuário escolhe um item do cardápio e adiciona ao carrinho.
     * 
     * Expectativa:
     * - A opção "Camarão à milanesa com gergelim" deve ser selecionada e adicionada ao carrinho.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: Porque há apenas a interação do usuário com o cardápio e a adição de um item no carrinho, sem detalhes internos.
     * 
     */
    cy.contains('div.section-item', 'Entradas', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.wait(3000);

    cy.contains('span.item-description', 'Camarão à milanesa com gergelim', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.wait(2000);

    // coloca a observação
    cy.get('textarea[formcontrolname="textInput"]')
      .scrollIntoView()
      .should('be.visible')
      .type('Por favor, retirar o gergelim e servir o molho tártaro à parte.');

    cy.get('div.button-submit-content')
      .contains('ADICIONAR')
      .click();

    cy.wait(4000);

    cy.get('div.image-container')
      .find('ion-icon[name="add"]')
      .click({ force: true });

    cy.wait(5000);
    cy.get('div.tip-option')
      .contains('span', 'R$ 0')
      .click();
  });

  // Teste 5: Finaliza o pedido e preenche o CPF se necessário
  it('Finaliza o pedido e preenche o CPF se necessário', () => {
    /**
     * 
     * Cenário: O usuário preenche o CPF caso necessário e finaliza o pedido.
     * 
     * Expectativa:
     * - O usuário deve preencher  os dados do CPF e confirmar o pedido.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: Pois, valida a experiência do usuário ao fornecer dados e finalizar o pedido.
     * 
     */
    cy.wait(3000);
    cy.contains('span', 'SELECIONE FORMA DE PAGAMENTO')
      .should('be.visible')
      .click();

    cy.wait(1000);
    cy.xpath('//*[@id="content"]/payment-methods/ion-content/section/base-segments/ion-segment/ion-segment-button[2]').click();

    cy.xpath('//*[@id="content"]/payment-methods/ion-content/section/section/payment-types-list/cb-base-list/div/payment-types-item[9]').click();

    cy.get('.loading-container', { timeout: 10000 }).should('not.exist');

    cy.get('body').then(($body) => {
      if ($body.find('span:contains("INFORME SEU CPF")').length > 0) {
        cy.contains('span', 'INFORME SEU CPF').click();
        cy.get('#cpf').clear().type(Cypress.env('cpf'));
        cy.get('#phone').clear().type(Cypress.env('phone'));

        cy.contains('button', 'SALVAR')
          .should('be.visible')
          .click();
      }
    });

    cy.wait(1000);
    cy.contains('button', 'CONFIRMAR PEDIDO')
      .should('be.visible')
      .click();

    cy.contains('button', 'Não')
      .should('be.visible')
      .click();
    cy.contains('span', 'CONFIRMAR E FAZER PEDIDO')
      .should('be.visible')
      .click();
  });

  // Teste 6: Realiza a avaliação do pedido
  it('Realiza a avaliação do pedido', () => {
    /**
     * 
     * Cenário: O usuário avalia o pedido feito.
     * 
     * Expectativa:
     * - O usuário deve ser capaz de avaliar o pedido fornecendo um feedback.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: devido a interação do usuário com o sistema de avaliações sem acessar sua implementação interna.
     * 
     */
    cy.wait(2000);

    cy.xpath('//*[@id="content"]/order-details/div/div/div[10]/cb-rating/main/div/div[4]/img')
      .click();

    cy.xpath('//*[@id="content"]/order-rating/div/div/div[4]/cb-text-input-with-count/main/div/form')
      .should('be.visible');

    cy.xpath('//*[@id="content"]/order-rating/div/div/div[4]/cb-text-input-with-count/main/div/form/textarea')
      .should('be.visible')
      .type('A comida estava boa, como o esperado. O único problema é que chegou um pouco tarde e não estava tão quente quanto eu gostaria. Mas ainda assim, gostei bastante!', { force: true });

    cy.xpath('//*[@id="content"]/order-rating/div/ion-row//span[contains(text(),"AVALIAR")]')
      .should('be.visible')
      .click();
  });

  // Teste 7: Fecha o popup de avaliação
  it('Fecha o popup de avaliação', () => {
    /**
     * 
     * Cenário: O usuário fecha o popup de avaliação após avaliar o pedido.
     * 
     * Expectativa:
     * - O popup de avaliação deve ser fechado corretamente.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: O teste valida a experiência do usuário ao fechar o popup de avaliação.
     * 
     */

    // Clica no botão de fechar
    cy.xpath('/html/body/app-root/ion-app/div/div/desktop-modal/div/order-rating-popup/main/base-button')
      .should('be.visible')
      .click();
  });

});
