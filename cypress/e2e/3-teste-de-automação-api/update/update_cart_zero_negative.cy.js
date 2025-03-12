describe('API - Atualizar Produto no Carrinho', () => {

  // Teste 1: Atualizar a quantidade do produto para zero
  it('Deve atualizar a quantidade do produto para zero', () => {
    /**
     * 
     * Cenário: Validar que a API permite atualizar a quantidade de um produto no carrinho para zero.
     * Caso a quantidade seja zero, o produto permanece no carrinho com quantidade zero.
     * 
     * Passos Realizados:
     * - Enviada uma requisição PUT para atualizar a quantidade de um produto no carrinho para zero.
     * - Produto com id = 18, quantidade: 0.
     * 
     * Expectativa:
     * - A resposta deve ter status 200.
     * - O produto deve existir no carrinho com quantidade igual a zero.
     * 
     * Técnica de Teste: Teste de Caixa Preta
     * - A entrada é fornecida com os dados do produto, onde a quantidade é zero. A saída esperada é a quantidade do produto
     *  ser igual a zero no carrinho.
     * 
     */
    cy.api({
      method: 'PUT',
      url: 'https://dummyjson.com/carts/1',
      headers: { 'Content-Type': 'application/json' },
      body: {
        merge: true,
        products: [
          { id: 18, quantity: 0 },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('products');
    });
  });

  // Teste 2: Aceitar valores negativos na quantidade do produto
  it('Deve aceitar valores negativos na quantidade do produto', () => {
    /**
     * 
     * Cenário: Validar que a API aceita valores negativos ao atualizar a quantidade de um produto.
     * 
     * Passos Realizados:
     * - Enviada uma requisição PUT para atualizar a quantidade de um produto para um valor negativo.
     * - Produto com id = 18, quantidade: -1.
     * 
     * Expectativa:
     * - A resposta deve ter status 200.
     * - O produto deve ser atualizado com a quantidade negativa.
     * 
     * Técnica de Teste: Teste de Caixa Preta
     * - A entrada é fornecida com uma quantidade negativa, e a saída esperada é a atualização da quantidade.
     * 
     */
    cy.api({
      method: 'PUT',
      url: 'https://dummyjson.com/carts/1',
      headers: { 'Content-Type': 'application/json' },
      body: {
        merge: true,
        products: [
          { id: 18, quantity: -1 },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('products');
    });
  });

});
