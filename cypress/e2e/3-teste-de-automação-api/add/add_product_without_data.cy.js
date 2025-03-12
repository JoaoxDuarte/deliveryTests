describe('API - Testando criação de carrinho com dados faltando', () => {

  it('Deve verificar o comportamento ao enviar um produto sem quantity, price, Id e Id inexistente', () => {
    /**
     * 
     * Cénario: Enviar um carrinho com dados faltando: como Id, preço ou um produto com Id inexistente — tudo no mesmo carrinho.
     * - Bem que poderia ter um aviso sobre os produtos ignorados.
     * 
     * Passos Realizados:
     * - Enviada uma requisição POST para criar um carrinho com produtos com dados faltando ou inválidos.
     * - Produtos: um com Id mas sem quantidade ou preço, outro sem Id, e um com Id inexistente.
     * 
     * Expectativa:
     * - A resposta deve ter status 200 ou 201.
     * - Apenas os produtos válidos devem ser adicionados ao carrinho, ignorando os inválidos.
     * 
     * Técnicas de Testes: 
     * - Caixa Preta: A entrada de produtos inválidos é analisada pela API e a saída, que é o comportamento esperado (carrinho com produtos válidos), é validada.
     * - Particionamento de Equivalência: Porque os prod. com dados "corretos" são considerados válidos e os produtos com dados faltando ou inválidos são inválidos.
     * 
     */

    cy.api({
      method: 'POST',
      url: 'https://dummyjson.com/carts/add',
      body: {
        userId: 5,
        products: [
          { id: 6 }, // Produto com Id mas sem quantidade ou preço
          { "title": "Eyeshadow Palette with Mirror" }, // sem Id
          { id: 99999, quantity: 2 } //  com Id inexistente
        ],
      },
      failOnStatusCode: false
    }).then((response) => {
      // Verificar se a resposta possui status 200 ou 201
      expect(response.status).to.be.oneOf([200, 201]);

      // Verificar se a API adicionou os produtos corretamente
      expect(response.body).to.have.property('products').that.is.an('array');

      // Verificar que o produto com Id inexistente não foi adicionado ao carrinho
      const produtoInexistente = response.body.products.find(p => p.id === 99999);
      expect(produtoInexistente).to.be.undefined;
    });
  });

});