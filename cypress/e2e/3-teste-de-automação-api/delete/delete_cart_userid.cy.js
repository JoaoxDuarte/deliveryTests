describe('API - Remover do Carrinho (Erro sem userId)', () => {
  it('Deve retornar sucesso e excluir o carrinho se o userId não for fornecido', () => {
    /**
     * 
     * Cenário: Validar se a API permite a remoção do carrinho, mesmo quando o userId não for fornecido no corpo da requisição.
     * 
     * Passos Realizados:
     * - Enviada uma requisição DELETE para excluir o carrinho com id 1, sem fornecer o userId.
     * 
     * Expectativa:
     * - A resposta deve ter status 200.
     * - isDeleted deve ser true = carrinho removido com sucesso.
     * - userId retornado ainda deve ser válido.
     *
     * Técnica de Teste:
     * - Caixa Preta: O teste valida apenas a funcionalidade da API. Com ela devendo responder adequadamente ao enviar
     *  a requisição com a ausência de userId, confirmando o comportamento esperado da remoção do carrinho.
     * 
     */
    cy.api({
      method: 'DELETE',
      url: 'https://dummyjson.com/carts/1',
      body: {},  // Sem userId
    }).then((response) => {
      expect(response.status).to.eq(200);  // Verifique o status 200 de sucesso na remoção

      // Verificando se o carrinho foi removido corretamente
      expect(response.body).to.have.property('isDeleted').and.eq(true);

      // Verificando se o userId ainda está presente e correto na resposta (caso esperado)
      expect(response.body).to.have.property('userId').and.eq(33);
    });
  });
});
