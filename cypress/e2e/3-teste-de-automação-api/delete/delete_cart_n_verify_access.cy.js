describe('API - Exclusão do Carrinho', () => {

  // Teste 1: Remove "Qualquer" Carrinho
  it('Deve remover o carrinho, mesmo que não esteja vazio', () => {
    /**
     * 
     * Cenário: Validar que a API permite a exclusão de um carrinho mesmo quando ele não está vazio.
     * 
     * Passos Realizados:
     * - Enviada uma requisição DELETE para remover o carrinho com id 1.
     * - O carrinho contém produtos, mas deve ser removido de qualquer forma.
     * 
     * Expectativa:
     * - A resposta deve ter status 200.
     * - isDeleted deve ser true, indicando que o carrinho foi removido.
     * - totalQuantity deve ser > 0, indicando que o carrinho ainda contém produtos antes de ser removido.
     *
     * Técnica de Teste:
     * - Caixa Preta: Ver a capacidade da API de remover o carrinho, independentemente de sua qtd de itens.
     * 
     */
    cy.api({
      method: 'DELETE',
      url: 'https://dummyjson.com/carts/1', // URL do carrinho
    }).then((response) => {
      expect(response.status).to.eq(200);  // Verifique o status 200 de sucesso na remoção

      // Verificando se o carrinho foi removido corretamente
      expect(response.body.isDeleted).to.eq(true);

      // Verificando a quantidade total de produtos no carrinho
      expect(response.body.totalQuantity).to.be.greaterThan(0);  // O carrinho ainda deve ter produtos antes da exclusão
    });
  });

    // Teste 2: Exclusão de Carrinho e Acesso Após Exclusão (A API não exclui devidamente)
      it('Deve excluir um carrinho e garantir que continue acessível após a exclusão', () => {
        /**
         * 
         * Cenário: Após a exclusão do carrinho, ele deve ser acessado novamente sem erro.
         * 
         * Passos:
         * - Deletar um carrinho.
         * - Tentar acessá-lo via GET após a exclusão.
         * 
         * Expectativa:
         * - A requisição DELETE deve retornar status 200 (sucesso).
         * - A requisição GET para o mesmo carrinho após a exclusão deve retornar status 200,
         * indicando que o carrinho foi excluído inicialmente, mas ainda pode ser acessado 
         * 
         * Técnica de Teste:
         * - Teste de Idempotência: Para garantir que, ao excluir o carrinho, a operação de exclusão pode ser repetida,
         * e o comportamento da API será o mesmo, com status 200 em ambas as tentativas de exclusão.
         * - Teste de Regressão: Verifica se a API não sofre alterações inesperadas após a execução da operação de exclusão,
         *  e que o comportamento permanece consistente ao tentar acessar o carrinho após a exclusão.
         * 
         */
        const cartId = 3;
    
        cy.api({
          method: 'DELETE',
          url: `https://dummyjson.com/carts/${cartId}`,
        }).then((response) => {
          // Verificando a resposta da exclusão
          expect(response.status).to.eq(200);
          expect(response.body.isDeleted).to.eq(true);
    
          cy.api({
            method: 'GET',
            url: `https://dummyjson.com/carts/${cartId}`,
            failOnStatusCode: false, 
          }).then((getResponse) => {
           
            expect(getResponse.status).to.eq(200);
            expect(getResponse.body).to.have.property('id', cartId);
          });
        });
      }); 
    }); 