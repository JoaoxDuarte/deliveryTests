describe('API - Remover do Carrinho', () => {
  
  // Teste 1: Remover um produto do carrinho
  it('Deve remover um produto do carrinho', () => {
    /**
     * 
     * Cenário: Validar se a API permite a remoção de um produto do carrinho.
     * 
     * Passos Realizados:
     * - Enviada uma requisição DELETE para remover um produto do carrinho com id 1.
     * 
     * Expectativa:
     * - A resposta deve ter status 200 OK, indicando sucesso na remoção do produto.
     * - isDeleted deve ser verdadeira, indicando que o produto foi removido.
     * - totalQuantity deve refletir a quantidade total de produtos restantes no carrinho.
     *
     * Técnica de Teste: Teste de Caixa Preta
     * - O teste valida a funcionalidade da API sem depender do conhecimento da implementação interna. A API deve responder
     * corretamente ao remover um produto do carrinho, mantendo as propriedades consistentes, como o status e a quantidade total de produtos.
     * 
     */
    cy.api({
      method: 'DELETE',
      url: 'https://dummyjson.com/carts/1',
    }).then((response) => {
      expect(response.status).to.eq(200);  // Verifique o status 200 de sucesso na remoção

      // Verificando se o produto foi removido corretamente
      expect(response.body).to.have.property('isDeleted', true);

      // Verificando a quantidade total de produtos no carrinho
      expect(response.body.totalQuantity).to.eq(15);
    });
  });

  // Teste 2: Tentar deletar um produto que não existe
  it('Deve retornar erro ao tentar deletar um produto que não existe', () => {
    /**
     * 
     * Cenário: Validar se a API retorna erro ao tentar remover um produto que não existe no banco de dados.
     * 
     * Passos Realizados:
     * - Enviada uma requisição DELETE para tentar remover um produto inexistente (id 9999).
     * 
     * Expectativa:
     * - A resposta deve ter status 404 (não encontrado).
     * - A resposta deve conter uma mensagem de erro informando que o produto não foi encontrado.
     *
     * Técnica de Teste: Teste de Caixa Preta
     * - O teste valida o comportamento da API quando se tenta remover um produto inexistente. A API deve retornar o status 
     * correto (404) e uma mensagem de erro explicando o motivo.
     * 
     */
    const nonExistentProductId = 9999;

    cy.api({
      method: 'DELETE',
      url: `https://dummyjson.com/products/${nonExistentProductId}`,
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.eq(404); 

      // Verificando a mensagem de erro correta
      expect(response.body).to.have.property('message', `Product with id '${nonExistentProductId}' not found`);
    });
  });
});