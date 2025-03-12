describe('API - Adicionar ao Carrinho (erro com userId)', () => {

  // Teste 1: Verificar erro se o userId não for passado
  it('Deve retornar um ERRO se o userId não for passado', () => {
    /**
     * 
     * Objetivo: Validar que a API retorna um erro 400 quando o parâmetro userId não é fornecido.
     * 
     * Passos Realizados:
     * - Realizada uma requisição POST para adicionar produtos ao carrinho sem o campo userId.
     * 
     * Comportamento Esperado:
     * - A resposta deve ter status 400 e a mensagem de erro "User id is required".
     * 
     * Técnica de Teste:
     * - Caixa Preta: A entrada é fornecida sem o campo userId e a saída esperada é a resposta de erro 400 com a mensagem.
     * 
     */
    cy.api({
      method: 'POST',
      url: 'https://dummyjson.com/carts/add',
      body: {
        products: [
          { id: 144, quantity: 4 },
          { id: 98, quantity: 1 },
        ],
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message').and.include('User id is required');
    });
  });

  // Teste 2: Verificar erro se o userId não existir
  it('Deve retornar um ERRO se o userId não existir', () => {
    /**
     * 
     * Objetivo: Validar que a API retorna um erro 404 quando o userId fornecido não existir.
     * 
     * Passos Realizados:
     * - Realizada uma requisição POST para adicionar produtos ao carrinho com um userId inexistente.
     * 
     * Comportamento Esperado:
     * - A resposta deve ter status 404 e a mensagem de erro "User with id '9999' not found".
     * 
     * Técnica de Teste:
     * - Caixa Preta: A entrada é fornecida com um userId inexistente e a saída esperada é a resposta de erro 404 com a mensagem de erro indicando que
     *  o usuário não foi encontrado.
     * 
     */
    cy.api({
      method: 'POST',
      url: 'https://dummyjson.com/carts/add',
      body: {
        userId: 9999, // userId inexistente
        products: [
          { id: 144, quantity: 4 },
          { id: 98, quantity: 1 },
        ],
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('message').and.include('User with id \'9999\' not found');
    });
  });

  // Teste 3: Verificar erro se o userId for vazio
  it('Deve retornar um ERRO se o userId for vazio', () => {
    /**
     * 
     * Objetivo: Validar que a API retorna um erro 400 quando o campo userId estiver vazio.
     * 
     * Passos Realizados:
     * - Realizada uma requisição POST para adicionar produtos ao carrinho com userId vazio.
     * 
     * Comportamento Esperado:
     * - A resposta deve ter status 400 e a mensagem de erro "User id is required".
     * 
     * Técnica de Teste: 
     * - Caixa Preta: A entrada é fornecida com um userId vazio e a saída esperada é a resposta de erro 400 com a mensagem de erro indicando que
     *  o campo é obrigatório.
     * 
     */
    cy.api({
      method: 'POST',
      url: 'https://dummyjson.com/carts/add',
      body: {
        userId: '', // userId vazio
        products: [
          { id: 144, quantity: 4 },
          { id: 98, quantity: 1 },
        ],
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message').and.include('User id is required');
    });
  });

  // Teste 4: Verificar erro se o userId for apenas um espaço em branco
  it('Deve retornar um ERRO se o userId for apenas um espaço em branco', () => {
    /**
     * 
     * Objetivo: Validar que a API retorna um erro 404 quando o userId for apenas um espaço em branco.
     * 
     * Passos Realizados:
     * - Realizada uma requisição POST para adicionar produtos ao carrinho com um userId contendo um espaço em branco.
     * 
     * Comportamento Esperado:
     * - A resposta deve ter status 404 e a mensagem de erro "User with id ' ' not found".
     * 
     * Técnica de Teste:
     * - Caixa Preta: A entrada é fornecida com um userId com espaço em branco e a saída esperada é a resposta de erro 404 com
     *  a mensagem de erro indicando que o usuário não foi encontrado.
     * 
     */
    cy.api({
      method: 'POST',
      url: 'https://dummyjson.com/carts/add',
      body: {
        userId: ' ', // com um espaço
        products: [
          { id: 144, quantity: 4 },
          { id: 98, quantity: 1 },
        ],
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('message').and.include('User with id \' \' not found');
    });
  });
});
