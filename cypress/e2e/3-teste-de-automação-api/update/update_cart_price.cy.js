describe('API - Atualizar Produto no Carrinho com Novo Preço e Quantidade', () => {
  it('Deve atualizar o preço e a quantidade de um produto no carrinho', () => {
    /**
     * 
     * Cenário: Validar que a API permite a atualização do preço e da quantidade de um produto no carrinho.
     * 
     * (opcinal) Filtro:
     * - add: const updatedProduct = response.body.products.find(product => product.id === 168); para pegar apenas o id 168
     * 
     * Passos Realizados:
     * - Enviada uma requisição PUT para atualizar o produto com id 168.
     * - Novo preço: 45000.00 e nova quantidade: 3.
     * 
     * Expectativa:
     * - A resposta deve ter status 200.
     * - O preço e a quantidade do produto devem ser atualizados corretamente.
     * - Retorna todos os produtos no carrinho, incluindo os que não foram atualizados.
     * - O total deve ser recalculado corretamente com uma margem de erro aceitável.
     * 
     * Técnica de Teste:
     * - Caixa Preta: A entrada é fornecida com os dados atualizados do produto -> novo preço e quantidade. A saída esperada
     *  é que a atualização do produto no carrinho, incluindo o cálculo do total.
     * 
     */
    cy.api({
      method: 'PUT',
      url: 'https://dummyjson.com/carts/1',
      headers: { 'Content-Type': 'application/json' },
      body: {
        merge: true,
        products: [
          { id: 168, price: 45000.00, quantity: 3 },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      // Verificar se os campos foram atualizados corretamente
      expect(response.body.products[0].id).to.eq(168);
      expect(response.body.products[0].price).to.eq(45000.00);
      expect(response.body.products[0].quantity).to.eq(3);

      // Recalcular o total esperado com base nos dados da resposta
      const updatedProductTotal = 45000.00 * 3;
      const otherProductTotals = response.body.products
        .filter(product => product.id !== 168)
        .reduce((acc, product) => acc + product.total, 0);
      const expectedTotal = updatedProductTotal + otherProductTotals;

      // Verificando o total com uma margem de erro mais ampla
      const total = parseFloat(response.body.total.toFixed(2));
      const marginOfError = 100; // margem de erro tendo em vista o total

      // Compara o total retornado com o esperado, com a margem de erro
      expect(Math.abs(total - expectedTotal)).to.be.lessThan(marginOfError);
    });
  });
});
