describe('API - Criação de Carrinho (Produto sem ID)', () => {

  it('Deve ignorar produtos sem Id e criar um carrinho vazio', () => {
    /**
     * 
     * Cénario: Enviar um carrinho com um produto sem Id.
     * 
     * Passos Realizados:
     * - Enviada uma requisição POST para criar um carrinho com um produto sem Id.
     * - Produto: { quantity: 2, price: 10.99 } (sem Id).
     * 
     * Expectativa:
     * - A resposta deve ter status 200 ou 201.
     * - A API deve criar um carrinho vazio, ignorando o produto sem Id.
     * 
     * Técnicas de Testes: 
     * - Caixa Preta: Pois validamos a resposta da API sem acessar a implementação interna.
     * - Teste de Funcionalidade: Tem a funcionalidade de ignorar produtos sem Id está sendo executada corretamente, criando um carrinho vazio.
     * 
     */

    cy.api({
      method: 'POST',
      url: 'https://dummyjson.com/carts/add',
      body: {
        userId: 56,
        products: [
          { quantity: 2, price: 10.99 } // Produto sem Id
        ],
      },
      failOnStatusCode: false
    }).then((response) => {
      // Verificar se a API cria o carrinho mesmo sem produtos válidos
      expect(response.status).to.be.oneOf([200, 201]);
      
      // Verificar se o carrinho está vazio
      expect(response.body.products).to.be.an('array').that.is.empty;
      expect(response.body.total).to.eq(0); 
      expect(response.body.totalQuantity).to.eq(0); 
    });
  });

});
