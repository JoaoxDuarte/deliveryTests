describe('API - Atualizar Produto no Carrinho', () => {

  // Teste 1: Atualizar a quantidade de um produto no carrinho por id
  it('Deve atualizar a quantidade de um produto no carrinho por id', () => {
    /**
     * 
     * Cenário: Validar se a API permite a atualização da quantidade de um produto específico no carrinho, dado seu id.
     * 
     * Passos Realizados:
     * - Enviada uma requisição PUT para atualizar a quantidade de um produto específico no carrinho.
     * - Produto com id = 1, quantidade: 2.
     * 
     * Expectativa:
     * - A resposta deve ter status 200.
     * - O total da compra deve ser arredondado para duas casas decimais.
     *
     * Técnica de Teste: Teste de Caixa Preta
     * - O teste verifica o comportamento da API com base nas entradas fornecidas e na saída esperada.
     * - A API não exige conhecimento da implementação interna para validar os resultados.
     * 
     */
    cy.api({
      method: 'PUT',
      url: 'https://dummyjson.com/carts/1',
      headers: { 'Content-Type': 'application/json' },
      body: {
        merge: true,
        products: [
          { id: 1, quantity: 2 }, 
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

    
      const total = parseFloat(response.body.total.toFixed(2));
      const expectedTotal = 103784.84;
      const marginOfError = 10; 

      expect(Math.abs(total - expectedTotal)).to.be.lessThan(marginOfError);
    });
  });

  // Teste 2: Atualizar todos os produtos no carrinho
  it('Deve atualizar todos os produtos no carrinho', () => {
    /**
     * 
     * Cenário: Validar se a API permite a atualização de todos os produtos no carrinho de uma vez.
     * 
     * Passos Realizados:
     * - Enviada uma requisição PUT para atualizar todos os produtos no carrinho.
     * - Produtos com ids: 1, 168, 78, 183, 100, com quantidades variadas.
     * 
     * Expectativa:
     * - A resposta deve ter status 200.
     * - O total deve ser atualizado de acordo com os novos valores.
     * 
     * Técnica de Teste: Teste de 
     * - Caixa Preta: O teste verifica o comportamento da API com base nos dados fornecidos e o cálculo do total. Queremos apenas
     *  sua funcionalidade de atualização.
     * 
     */
    cy.api({
      method: 'PUT',
      url: 'https://dummyjson.com/carts/1',
      headers: { 'Content-Type': 'application/json' },
      body: {
        merge: true,
        products: [
          { id: 1, quantity: 2 }, 
          { id: 168, quantity: 4 }, 
          { id: 78, quantity: 3 }, 
          { id: 183, quantity: 6 }, 
          { id: 100, quantity: 7 }, 
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const total = response.body.total;  
      const expectedTotal = 139079.78;    

      const marginOfError = 5000;  // Margem de erro

      // Comparar os totais com a margem de erro
      expect(Math.abs(total - expectedTotal)).to.be.lessThan(marginOfError);
    });
  });

});
