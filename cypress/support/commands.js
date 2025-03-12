/*
/// <reference types="cypress" />
*/
import 'cypress-xpath';
import 'cypress-plugin-api';


// Realizar Login
// Ele usa os dados do cypress.env.json, por ser informações sigilosas
Cypress.Commands.add('realizarLogin', () => {
    // Verificar o valor da variável de ambiente
    cy.log('LogIniciando login com email:', Cypress.env('email'));

    // Preenche
    cy.get('input[name="username"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(Cypress.env('email')); 
    cy.get('input[name="password"]').type(Cypress.env('password'), { log: false });
    cy.contains('span', 'ENTRAR').click();
    // Fechar o popup de envio do código
    cy.contains('button', 'FECHAR').click();
  
    // Preencher OTP
    cy.get('input[id^="otp_"]', { timeout: 10000 }).should('be.visible').each(($el) => {
      cy.wrap($el).focus().type('A', { force: true }).should('have.value', 'A');
    });

    cy.contains('span', 'ACESSAR').click();
  });


   // Realizar Cadastro (caso precise)
   // Tbm usa os dados do cypress.env.json
  Cypress.Commands.add('realizarCadastro', () => {
    cy.log('Iniciando cadastro com email:', Cypress.env('email'));

    cy.contains('span', 'Cadastre-se').click();
    cy.get('input[name="name"]').type('Test Code');
    cy.get('#ion-input-5').clear().type(Cypress.env('email'), { force: true });
    cy.xpath('//*[@id="ion-input-6"]').type(Cypress.env('password'));
    cy.xpath('//*[@id="ion-input-7"]').type(Cypress.env('password'));
    cy.xpath('//*[@id="formRegisterUser"]/div[9]/ion-select').click();
    cy.wait(2000);
    cy.xpath('//*[@id="ion-overlay-1"]/div[2]/div/div[1]/button[8]').click();
    cy.wait(1000);
    cy.xpath('//*[@id="formRegisterUser"]/div[11]/ion-item[2]/ion-checkbox').click();
    cy.xpath('//button[contains(text(), "ACEITAR")]').click();
    cy.wait(1000);
    cy.contains('span', 'CADASTRAR').click();

    cy.log('Cadastro realizado com sucesso.');
});


// Desabilita a rolagem automática para cima (Plugin API)
Cypress.on('window:before:load', (win) => {
  Object.defineProperty(win, 'scrollTo', {
    value: () => {},
    writable: true
  });
});