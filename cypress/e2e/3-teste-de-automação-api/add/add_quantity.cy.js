describe('API - Adiconar Quantidade Bem Alta ao Carrinho', () => {

    it('Deve permitir adicionar uma quantidade bem alta ao carrinho', () => {
      /**
       * 
       * Cenário: Deve permitir adicionar quantidade infinita  ao carrinho.
       * 
       * Passos Realizados:
       * - Enviada uma requisição POST para adicionar um produto ao carrinho com uma quantidade superior ao estoque disponível.
       * - Produto: id 8 com qtd infinita (ou um número excessivo para o estoque).
       * 
       * Expectativa:
       * - A resposta deve ter status 201
       * - O n° da qtd na resposta deve convertida para notação científica devido ao tamanho
       * 
       * Técnicas de Testes: 
       * - Caixa Preta: Verifica a entrada e a saída da API sem considerar os detalhes internos de implementação.
       * - Teste de Validação de Limite: Avalia a capacidade da API de lidar com grandes n°s e se a conversão para notação científica está sendo feita.
       * - Teste de Comportamento Esperado: Garante que a API processa a qtd alta, mas trata o valor de forma que não cause problemas nos cálculos e retornos.
       * 
       */
      cy.api({
        method: 'POST',
        url: 'https://dummyjson.com/carts/add',
        body: {
          userId: 9,
          products: [
            { id: 8, quantity: 12994599999999999999999999999999289999999999999939999994399999929999991999999999999990464560 },
          ],
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  
  });