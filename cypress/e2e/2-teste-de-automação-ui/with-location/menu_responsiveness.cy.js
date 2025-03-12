// A LOCALIZAÇÃO DO NAVEGADOR DE
describe('Teste de Responsividade', () => {
  const viewports = [
    { device: 'iPhone 6', size: 'iphone-6' },
    { device: 'iPad', size: 'ipad-2' },
    { device: 'Desktop', size: [1280, 800] }
  ];

  viewports.forEach(({ device, size }) => {
    context(`Testando em ${device}`, () => {
      
      beforeEach(() => {
        /**
         * 
         * Cenário: Validar a responsividade da interface em diferentes dispositivos.
         * 
         * Passos Realizados:
         * - Definido o viewport conforme o dispositivo (iPhone, iPad, Desktop) usando `cy.viewport`.
         * - A página de início é carregada utilizando `cy.visit('/')`.
         * 
         * Expectativa:
         * - O layout da página deve ser ajustado conforme o dispositivo.
         * - Elementos importantes da interface, como header e lista de segmentos, devem ser visíveis.
         * 
         * Técnica de Teste: 
         * - Caixa Preta: O teste está validando a funcionalidade de responsividade da página, sem a necessidade
         * de conhecimento interno sobre o funcionamento dos componentes.
         * 
         */
        if (Array.isArray(size)) {
          cy.viewport(size[0], size[1]); // Para desktop
        } else {
          cy.viewport(size); // Para presets como 'iphone-6'
        }
        cy.visit('/');
        cy.wait(3000);  
      });

      // Teste 1: Verificar se o header está visível no dispositivo
      it(`Verifica se o header está visível no ${device}`, () => {
        /**
         * 
         * Cenário: Validar se o header da página é exibido corretamente.
         * 
         * Expectativa:
         * - O header deve estar visível para o usuário em todos os dispositivos.
         * 
         * Técnica de Teste: 
         * - Caixa Preta: O teste valida apenas a visibilidade do header, sem precisar conhecer a implementação interna do componente.
         * 
         */
        cy.get('header', { timeout: 10000 }).should('be.visible');
      });

      // Teste 2: Verificar se a lista de segmentos está visível no dispositivo
      it(`Verifica se a lista de segmentos está visível no ${device}`, () => {
        /**
         * 
         * Cenário: Validar se a lista de segmentos é exibida corretamente.
         * 
         * Expectativa:
         * - A lista de segmentos deve estar visível para o usuário em todos os dispositivos.
         * 
         * Técnica de Teste: 
         * - Caixa Preta: O teste valida a visibilidade da lista de segmentos sem precisar entender como ela é renderizada internamente.
         * 
         */
        cy.get('.segment-list-container', { timeout: 10000 }).should('be.visible');
      });

      // Teste 3: Verificar se o usuário está na página correta
      it(`Verifica se o usuário está na página correta no ${device}`, () => {
        /**
         * 
         * Cenário: Validar se a URL está correta após o carregamento da página.
         * 
         * Expectativa:
         * - A URL deve conter '/delivery', indicando que a página de entrega foi carregada.
         * 
         * Técnica de Teste: 
         * - Caixa Preta: O teste valida apenas a navegação da página e a URL resultante, sem saber os detalhes internos sobre
         * como a navegação é realizada.
         * 
         */
        cy.url().should('include', '/delivery');
      });

    });
  });
});