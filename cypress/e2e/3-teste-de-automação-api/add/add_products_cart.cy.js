describe('API - Adicionar ao Carrinho', () => {
  
  // Teste 1: Adiciona produtos normalmente ao carrinho
  it('Deve adicionar produtos ao carrinho com sucesso', () => {
    /**
     * 
     * Cenário: Adicionar produtos ao carrinho.
     * 
     * Passos Realizados:
     * - Enviada uma requisição POST para adicionar dois produtos ao carrinho.
     * - Produtos: id 1 com quantidade 10 e id 2 com quantidade 1.
     * 
     * Expectativa:
     * - A resposta deve ter status 200 ou 201.
     * - Os produtos devem ser adicionados ao carrinho e o total deve ser calculado corretamente.
     * 
     * Técnicas de Testes: 
     * - Caixa Preta: Verificamos apenas a entrada e a saída da API.
     * - Análise de Limite: É para garantir que a qtd de produtos é válida (não negativa ou zero) para o cálculo correto do total.
     */

    cy.api({
      method: 'POST',
      url: 'https://dummyjson.com/carts/add',
      body: {
        userId: 1,
        products: [
          { id: 1, quantity: 10 },
          { id: 2, quantity: 1 },
        ],
      },
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      expect(response.body).to.have.property('products');
      
      // Verificar se os produtos retornados contêm os itens esperados
      const returnedProducts = response.body.products.map(({ id, quantity }) => ({ id, quantity }));
      expect(returnedProducts).to.deep.include({ id: 1, quantity: 10 });
      expect(returnedProducts).to.deep.include({ id: 2, quantity: 1 });

      // Verificar se o total está correto
      expect(response.body).to.have.property('total').and.equal(119.89);
      expect(response.body).to.have.property('discountedTotal').and.equal(112);
    });
  });

  // Teste 2: Verificar se o carrinho de um usuário não afeta o carrinho de outro
  it('Deve garantir que o carrinho de um usuário não afete o de outro', () => {
    /**
     * 
     * Objetivo: Validar que o carrinho de um usuário não influencia o carrinho de outro usuário.
     * 
     * Passos Realizados:
     * - Realiza uma requisição POST para adicionar um produto ao carrinho do usuário 1.
     * - Em seguida, realiza uma outra requisição POST para adicionar um produto diferente ao carrinho do usuário 2.
     * - Verifica se a resposta da requisição para o carrinho do usuário 2 é bem-sucedida (status 200 ou 201).
     * - Verifica se o carrinho retornado para o usuário 2 contém a propriedade `userId` com o valor 2, assegurando que os carrinhos são distintos.
     * 
     * Comportamento Esperado:
     * - O carrinho do usuário 1 deve ser isolado e não afetar o carrinho do usuário 2.
     * - Cada carrinho deve retornar o `userId` correto (1 para o primeiro carrinho e 2 para o segundo carrinho).
     * 
     * Técnica de Teste:
     * - Caixa Preta: A entrada são duas requisições para adicionar produtos aos carrinhos de dois usuários diferentes. A saída esperada é a correta separação dos carrinhos, com status de sucesso e o `userId` correto em cada resposta.
     * 
     */
    cy.api({
      method: 'POST',
      url: 'https://dummyjson.com/carts/add',
      body: {
        userId: 1,
        products: [
          { id: 1, quantity: 1 },
        ],
      },
    });

    cy.api({
      method: 'POST',
      url: 'https://dummyjson.com/carts/add',
      body: {
        userId: 2,
        products: [
          { id: 2, quantity: 2 },
        ],
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      expect(response.body).to.have.property('userId').and.eq(2);
    });
  });
});
