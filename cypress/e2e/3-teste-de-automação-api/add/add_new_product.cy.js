describe('API - Adicionar ao Carrinho um Novo Produto', () => {

  it('Deve criar um novo produto', () => {
    /**
     * 
     * Cénario: Criar um novo produto no sistema.
     * 
     * Passos Realizados:
     * - Enviada uma requisição POST para criar um novo produto no sistema.
     * - Produto com título: 'Produto Teste', preço: 150, estoque: 15.
     * 
     * Expectativa:
     * - A resposta deve ter status 201.
     * - O produto deve ter um ID gerado automaticamente.
     * - O título do produto deve ser 'Produto Teste'.
     * 
     * Técnica de Teste: 
     * - Caixa Preta: As entradas (title, price e stock), e a saída esperada é a criação bem-sucedida do produto com status 201, Id gerado e título correto.
     * 
     */
    cy.api({
      method: 'POST',
      url: 'https://dummyjson.com/products/add',
      body: {
        title: 'Produto Teste',
        price: 150,
        stock: 15,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Verificar se o produto foi criado corretamente com status 201
      expect(response.status).to.eq(201);

      // Verificar se o produto tem um Id gerado
      expect(response.body).to.have.property('id');

      // Verificar se o título do produto está certo
      expect(response.body).to.have.property('title', 'Produto Teste');
    });
  });

});