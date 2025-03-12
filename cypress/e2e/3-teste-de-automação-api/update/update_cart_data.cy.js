describe('API - Teste de atualização do carrinho', () => {

  // Teste 1: Atualizar carrinho com um produto válido
  it('Deve retornar sucesso ao atualizar carrinho com dados válidos', () => {
    /**
     * 
     * Cenário: Validar se a API permite a atualização do carrinho quando um único produto válido é enviado.
     * 
     * Passos Realizados:
     * - Enviada uma requisição PUT para atualizar o carrinho com um produto específico.
     * - Produto: Charger SXT RWD, preço: 32999.99, quantidade: 2.
     * 
     * Expectativa:
     * - A resposta deve ter status 200 ou 201.
     * - O preço e a quantidade do produto devem corresponder aos valores enviados.
     * 
     * Técnica de Teste:
     * - Caixa Preta: A entrada é fornecida com dados do produto (preço e quantidade) e a saída esperada é a atualização correta no carrinho, com
     *  os dados de preço e quantidade correspondentes.
     * 
     */
    cy.api({
      method: 'PUT',
      url: 'https://dummyjson.com/carts/1',
      body: {
        products: [
          {
            id: 168,
            title: 'Charger SXT RWD',
            price: 32999.99,  
            quantity: 2, 
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]); 
      expect(response.body.products[0].price).to.eq(32999.99); 
      expect(response.body.products[0].quantity).to.eq(2);
    });
  });

  // Teste 2: Atualizar carrinho com qtd válida e preço válido
  it('Deve retornar sucesso ao tentar atualizar carrinho com quantidade válida e preço válido', () => {
    /**
     * 
     * Cenário: Validar que a API permite a atualização do carrinho com uma quantidade menor do produto.
     * 
     * Passos Realizados:
     * - Enviada uma requisição PUT para atualizar o carrinho com um produto específico.
     * - Produto: Charger SXT RWD, preço: 32999.99, quantidade: 1.
     * 
     * Expectativa:
     * - A resposta deve ter status 200 ou 201.
     * - O preço e a quantidade do produto devem corresponder aos valores enviados.
     * 
     * Técnica de Teste:
     * - Caixa Preta: Sendo preço e quantidade e a saída esperada é a atualização do carrinho, com as entradas corrigidas.
     * 
     */
    cy.api({
      method: 'PUT',
      url: 'https://dummyjson.com/carts/1',
      body: {
        products: [
          {
            id: 168,
            title: 'Charger SXT RWD',
            price: 32999.99,  
            quantity: 1, 
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      expect(response.body.products[0].price).to.eq(32999.99);
      expect(response.body.products[0].quantity).to.eq(1);
    });
  });

  // Teste 3: Atualizar carrinho com múltiplos produtos válidos
  it('Deve retornar sucesso ao atualizar carrinho com múltiplos produtos válidos', () => {
    /**
     * 
     * Cenário: Validar que a API permite a atualização do carrinho com múltiplos produtos válidos.
     * 
     * Passos Realizados:
     * - Enviada uma requisição PUT para atualizar o carrinho com dois produtos distintos.
     * - Produto 1: Charger SXT RWD, preço: 42999.99, quantidade: 7.
     * - Produto 2: Apple MacBook Pro 14 Inch, preço: 8989.99, quantidade: 1.
     * 
     * Expectativa:
     * - A resposta deve ter status 200 ou 201.
     * - O número de produtos no carrinho deve ser 2.
     * 
     * Técnica de Teste:
     * - Caixa Preta: Sendo as entradas (preços e quantidades) e a saída esperada é a atualização correta do carrinho com
     * os 2 produtos e as qtds certas.
     * 
     */
    cy.api({
      method: 'PUT',
      url: 'https://dummyjson.com/carts/1',
      body: {
        products: [
          {
            id: 168,
            title: 'Charger SXT RWD',
            price: 42999.99,
            quantity: 7,
          },
          {
            id: 190,
            title: 'Apple MacBook Pro 14 Inch Space Grey',
            price: 8989.99,
            quantity: 1,
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      expect(response.body.products.length).to.eq(2);
    });
  });

});