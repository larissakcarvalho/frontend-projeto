# Digital Store

Loja virtual demonstrativa desenvolvida com React e Vite, com layout adaptável para computadores e dispositivos móveis.

## Links do projeto

- **Aplicação publicada:** [frontend-projeto-scne.vercel.app](https://frontend-projeto-scne.vercel.app)
- **Repositório:** [larissakcarvalho/frontend-projeto](https://github.com/larissakcarvalho/frontend-projeto)
- **Pull request da entrega:** [PR #1 — Implementa aplicação Digital Store em React](https://github.com/larissakcarvalho/frontend-projeto/pull/1) — mesclado na branch `main`.
- **Ajuste de rotas para publicação:** [PR #3](https://github.com/larissakcarvalho/frontend-projeto/pull/3) — mesclado na branch `main`.
- **Organização do projeto e documentação:** [PR #5](https://github.com/larissakcarvalho/frontend-projeto/pull/5) — mesclado na branch `main`.
- **Integração com APIs e atualização visual:** [PR #6](https://github.com/larissakcarvalho/frontend-projeto/pull/6) — mesclado na branch `main`; publicação atualizada.
- **Documentação-base:** [projeto-digital-store](https://github.com/digitalcollegebr/projeto-digital-store)
- **Referência visual:** [Figma — Drip Store](https://www.figma.com/design/cfb4F7ZXMFQmvmTn3PKI4z/DRIP-STORE---DIGITAL-COLLEGE?node-id=22-30)

## Requisitos

- Node.js 20.19 ou superior, ou Node.js 22.12 ou superior
- npm

## Como instalar e executar

1. Clone o repositório e acesse a pasta do projeto:

   ```bash
   git clone https://github.com/larissakcarvalho/frontend-projeto.git
   cd frontend-projeto
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra no navegador o endereço informado pelo Vite, normalmente `http://localhost:5173`.

## Páginas e funcionalidades

- **Início (`/`):** carrossel, atalhos de categoria, coleções, produtos em destaque, benefícios e formulário de novidades.
- **Produtos (`/products` ou `/produtos`):** catálogo, busca por `?filter=`, filtros por categoria e faixa de preço e ordenação.
- **Detalhes do produto (`/product/:id` ou `/produto/:id`):** galeria, seleção de tamanho e cor, quantidade e botão de compra.
- **Sacola:** itens adicionados, alteração de quantidades e subtotal.
- **Navegação adaptável:** menu, busca e filtros em painéis móveis.

## Integração com API

O catálogo consulta a [DummyJSON Products API](https://dummyjson.com/docs/products) para carregar produtos e a [Frankfurter API](https://frankfurter.dev/) para obter a cotação atual de USD para BRL. Os preços da API são convertidos para reais; a data da cotação é exibida na loja. A integração é somente de leitura e não realiza pedidos.

Os produtos locais de `src/data/products.js` permanecem no catálogo junto aos produtos remotos. Se uma das APIs estiver indisponível, a loja informa o problema e continua com os produtos locais, oferecendo uma opção para tentar novamente. Imagens remotas e fontes tipográficas também dependem de conexão com a internet.

A aplicação não integra autenticação ou processamento real de pagamentos; cadastro, login e compra são demonstrativos.

## Estrutura do código

- `src/components/`: componentes compartilhados, como cabeçalho, logo, galeria, filtros e cartões de produtos.
- `src/pages/`: páginas da loja e o layout comum entre elas.
- `src/data/`: dados locais e funções auxiliares do catálogo.
- `src/services/`: integração com APIs externas e adaptação dos dados recebidos.
- `public/` e `src/assets/`: ícones e imagens utilizados pela aplicação.

## Verificações

Execute o analisador estático e a compilação de produção:

```bash
npm run lint
npm run build
```

Para visualizar localmente a compilação gerada:

```bash
npm run preview
```

## Entrega

- **Integrante:** Larissa Kelly de Carvalho.
- **Prazo informado:** 20/11/2026.
