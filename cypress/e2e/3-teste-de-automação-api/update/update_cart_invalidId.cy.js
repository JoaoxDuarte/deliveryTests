describe('API - Atualizar Produto no Carrinho com Id Inválido', () => {

    it('Deve aceitar a atualização do produto mesmo com um Id inválido', () => {
      /**
       * 
       * Cenário: Validar se API aceita o "update" de um produto mesmo que o Id não exista no carrinho, junto com a alta qtd.
       * 
       * Passos Realizados:
       * - Enviada uma requisição PUT para atualizar um produto com id inexistente.
       * - Produto com id = 99999 (um id que não existe no carrinho) e qtd: 999.
       * 
       * Expectativa:
       * - A resposta ser 200.
       * - O produto deve ser adicionado ao carrinho com a quantidade informada.
       * 
       * Técnica de Teste: Teste de Caixa Preta
       * - A entrada é fornecida com um ID inexistente e uma quantidade válida, e a saída esperada é a aceitação da
       *  requisição e a adição do produto ao carrinho.
       * 
       */
      cy.api({
        method: 'PUT',
        url: 'https://dummyjson.com/carts/1',
        headers: { 'Content-Type': 'application/json' },
        body: {
          merge: true,
          products: [
            { id: 99999, quantity: 999 }, 
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('products');
      });
    });
});
