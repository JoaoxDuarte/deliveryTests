describe('API - Adicionar ao Carrinho (adicoes sequenciais)', () => {

    it('Deve lidar com múltiplas adições ao carrinho sequenciais', () => {
      /**
       * 
       * Objetivo: Validar que a API consegue processar múltiplas requisições de adição ao carrinho de forma sequencial.
       * 
       * Passos Realizados:
       * - Realiza uma série de 40 requisições POST para adicionar o mesmo produto ao carrinho de compras.
       * - A cada requisição, verifica se o status da resposta é um código 200 ou 201, indicando sucesso.
       * 
       * Comportamento Esperado:
       * - Cada requisição deve retornar um status de sucesso (200 ou 201), indicando que o produto foi adicionado corretamente ao carrinho.
       * 
       * Técnica de Teste:
       * - Caixa Preta: A entrada são múltiplas requisições de adição ao carrinho. A saída esperada é o sucesso de cada requisição com os status 200 ou 201.
       * 
       */
      for (let i = 0; i < 40; i++) {  
        cy.api({
          method: 'POST',  
          url: 'https://dummyjson.com/carts/add',  
          body: {
            userId: 1, 
            products: [
              { id: 1, quantity: 1 },
            ],
          },
          failOnStatusCode: false, 
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 201]);
        });
      }
    });

    
    });

  