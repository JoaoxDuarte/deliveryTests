# Testes de Automação - QA

Este repositório contém os testes automatizados para a plataforma de delivery, abrangendo testes de UI e API. Os detalhes dos fluxos estão no arquivo **Case.pdf**, fora da pasta Cypress.

---

## 📜 Índice (Interativo)

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Inicialização](#inicialização)
- [Estrutura dos Testes](#estrutura-dos-testes)
- [Documentação dos Testes](#documentação-dos-testes)
- [Fluxo Principal dos Testes](#fluxo-principal-dos-testes)
- [Configuração](#configuração)

---

## 📋 <a id="pré-requisitos"></a>Pré-requisitos

Para rodar o projeto, certifique-se de ter os seguintes requisitos instalados:

- **Node.js**: [Baixe aqui](https://nodejs.org)
- **npm**: Normalmente instalado junto com o Node.js
- **Yarn** (opcional): [Documentação](https://classic.yarnpkg.com/en/docs/getting-started)

---

## 🛠️ <a id="instalação"></a>Instalação

OBS: O projeto pode ser baixado manualmente. (Opcional)

1. Clone este repositório:

```bash
   git clone https://github.com/JoaoxDuarte/deliveryTests.git
```

2. Navegue até o diretório do projeto:

```bash
   cd deliveryTests
```

3. Instale as dependências:

```bash
   npm install
```

- As dependências incluem:
  - **Cypress v14.1.0**: Ferramenta de testes.
  - **Xpath v2.0.1**: Permite ao Cypress usar expressões XPath.
  - **Plugin-api v2.11.2**: Torna a interface parecida com a do Postman. [Documentação](https://www.npmjs.com/package/cypress-plugin-api)

4. Confirme que você tem as principais dependências:

```bash
npm list --depth=0
```
Com isso, terá todo o necessário para executar este projeto.

---

## 🚀 <a id="inicialização"></a>Inicialização

De preferência, para rodar os testes, use a interface gráfica do Cypress com o comando:

```bash
npx cypress open  
```

Depois, selecione "E2E Testing", escolha um navegador e escolha o teste.

![automacao_api](https://github.com/user-attachments/assets/2bdb3b94-a461-4dd6-a44f-702ed44c54b6)



(Opcional) Para rodar diretamente no terminal, use:

```bash
npx cypress run
```

(Opcional) Para rodar apenas os testes de API, utilize:

```bash
npx cypress run --spec "cypress/e2e/3-teste-de-automacao-api/*"
```

(Opcional) Para rodar apenas os testes de UI:

```bash
npx cypress run --spec "cypress/e2e/2-teste-de-automacao-ui/*"
```

---

## 📂 <a id="estrutura-dos-testes"></a>Estrutura dos Testes

### Testes de UI

Os testes de UI estão na pasta:

```
cypress/e2e/2-teste-de-automacao-ui
```
**ATENÇÃO** sobre os seguntes testes dentro das pastas: 
- **with-location**: Esses testes, precisam rodar com a localização do navegador ativada.

![loca_c](https://github.com/user-attachments/assets/46150912-525a-4786-ad49-56ab455cba12)

- **without-location**: Já esses, precisam rodar com a localização do navegador desativada.

![loca_s](https://github.com/user-attachments/assets/07e884c2-c3cc-4d88-97a6-2689549b30e7)


### Testes de API

Os testes de API estão na pasta:

```
cypress/e2e/3-teste-de-automacao-api
```

Cada rota (add, update e delete) tem uma pasta contendo diversos testes.

Os arquivos podem conter vários testes semelhantes, diferenciados na documentação por "Teste 1", "Teste 2", etc.

---
## 📖 <a id="documentação-dos-testes"></a>Documentação dos Testes

Cada arquivo de teste contém documentação própria, podendo incluir:

- **Cenário**
- **Passos Realizados**
- **Expectativa**
- **Técnica de Teste**

---

## 📚 <a id="fluxo-principal-dos-testes"></a>Fluxo Principal dos Testes

O fluxo principal testado foi o: **2 (Exploração do Cardápio e Adição ao Carrinho)**, mas para testá-lo foi necessário passar pelo **fluxo 1 (Seleção de Localização e Restaurante)**. Foram incluídos fluxos adicionais, como login e cadastro, para garantir maior robustez.

Os fluxos principais estão documentados no arquivo **Case.pdf**.

---

## ⚙️ <a id="configuração"></a>Configuração

### Variáveis de Ambiente

- O arquivo **cypress.env.json** armazena informações sigilosas. Como os dados são apenas para teste, ele foi incluído no repositório.
- O arquivo **cypress.config.mjs** contém as configurações importantes.

### Suporte e Comandos Customizados

- Em **cypress/support/commands.js** estão as importações e funções auxiliares utilizadas nos testes.
- Foi utilizado o **Plugin API** para visualização dos testes de API.
- Os testes foram executados no **Google Chrome**, por ser o navegador mais utilizado.
- **Postman** foi utilizado para auxílio na criação dos testes, mas não é necessário para rodá-los.

---
