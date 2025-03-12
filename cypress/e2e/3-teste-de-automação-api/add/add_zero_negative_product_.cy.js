describe('API - Testando criação de carrinho com quantidade zero ou negativa', () => {
  it('Deve criar o carrinho mesmo com quantidade zero ou negativa', () => {
    /**
     * 
     * Cenário: Enviar um carrinho com produtos cujas quantidades são zero ou negativas.
     * 
     * Passos Realizados:
     * - Enviada uma requisição POST para criar o carrinho com 3 produtos.
     * - Produtos: id 1 com quantidade 0, id 2 com quantidade -0, id 3 com quantidade -3.
     * 
     * Expectativa:
     * - A resposta deve ter status 200 ou 201.
     * - A API deve aceitar os produtos, ajustando as quantidades inválidas para 1 (TIRANDO O -3).
     * - A qtd total de produtos no carrinho, neste teste, deve ter valores NEGATIVOS.
     * - A resposta deve conter: "totalProducts": 3 & "totalQuantity": -1
     * 
     * Técnicas de Testes: 
     * - Caixa preta: Para ver se a API responde adequadamente com base na entrada fornecida, sem olhar para a implementação interna.
     * - Particionamento de Equivalência: A entrada inclui valores aceitos pela API e inválidos.
     * 
     */
    cy.api({
      method: 'POST',
      url: 'https://dummyjson.com/carts/add',
      body: {
        userId: 30,
        products: [
          { id: 1, quantity: 0 },
          { id: 2, quantity: -0 },
          { id: 3, quantity: -3 },
        ],
      },
      failOnStatusCode: false,
    }).then((response) => {
      // A API vai ACEITAR
      expect(response.status).to.be.oneOf([200, 201]);

      // Verifica se o carrinho foi criado corretamente, mesmo com quantidades inválidas, deve ter 3 prod.
      expect(response.body.products.length).to.eq(3);

      // Verificar as quantidades dos produtos com base na resposta esperada
      expect(response.body.products[0].quantity).to.eq(1); // qtd 0 é ajustado para 1
      expect(response.body.products[1].quantity).to.eq(1); // qtd -0 é ajustado para 1
      expect(response.body.products[2].quantity).to.eq(-3); // qtd (-3) permanece inalterado


      expect(response.body.total).to.be.closeTo(-14.99, 0.01);  // Margem de erro de 0.01 (2 casas decimais)
      expect(response.body.discountedTotal).to.be.closeTo(-9, 0.01);
    });
  });
});
