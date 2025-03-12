describe('API - Exclusão de Produto', () => {

  // Por ter duas exclusões em um único teste, decidi deixar em um arquivo separado.
  it('Deve retornar status 200 mesmo ao tentar excluir um carrinho já removido', () => {
    /**
     * 
     * Cenário: Verificar se a API retorna status 200 ao tentar remover um carrinho,
     * msm que o carrinho já tenha sido excluído.
     * 
     * Passos:
     * - Enviar uma requisição DELETE para remover um carrinho existente.
     * - Enviar outra requisição DELETE para o mesmo carrinho já removido.
     * 
     * Expectativa:
     * - A primeira requisição deve retornar status 200 (sucesso).
     * - A segunda requisição também deve retornar status 200, indicando que a operação de exclusão
     * foi aceita novamente pela API, mesmo que o carrinho já tenha sido removido.
     * 
     * Técnica de Teste:
     * - Teste de Regressão: Para garantir que, ao excluir um carrinho já removido,
     * a API se comporta da mesma forma, sem quebrar o fluxo esperado de exclusão.
     * - Teste de Idempotência: Para verificar que a exclusão repetida do carrinho (recurso) NÃO altera
     * o comportamento do sistema, retornando o msm resultado independentemente de quantas vezes a operação é tentada.
     * 
     */
    const cartId = 1;

    // 1° Requisição DELETE
    cy.api({
      method: 'DELETE',
      url: `https://dummyjson.com/carts/${cartId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.isDeleted).to.eq(true);

      // 2° Requisição DELETE para o carrinho já excluído
      cy.api({
        method: 'DELETE',
        url: `https://dummyjson.com/carts/${cartId}`,
        failOnStatusCode: false,
      }).then((secondResponse) => {

        expect(secondResponse.status).to.eq(200);
        expect(secondResponse.body.isDeleted).to.eq(true);
      });
    });
  });

});
