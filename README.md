# Digital Store

Loja virtual demonstrativa desenvolvida com React e Vite, com layout adaptável para computadores e dispositivos móveis.

## Links do projeto

- **Aplicação publicada:** [frontend-projeto-scne.vercel.app](https://frontend-projeto-scne.vercel.app)
- **API publicada:** [store-backend-projeto.vercel.app](https://store-backend-projeto.vercel.app)
- **Repositório:** [larissakcarvalho/frontend-projeto](https://github.com/larissakcarvalho/frontend-projeto)
- **Pull request da entrega:** [PR #1 — Implementa aplicação Digital Store em React](https://github.com/larissakcarvalho/frontend-projeto/pull/1) — mesclado na branch `main`.
- **Ajuste de rotas para publicação:** [PR #3](https://github.com/larissakcarvalho/frontend-projeto/pull/3) — mesclado na branch `main`.
- **Organização do projeto e documentação:** [PR #5](https://github.com/larissakcarvalho/frontend-projeto/pull/5) — mesclado na branch `main`.
- **Integração com APIs e atualização visual:** [PR #6](https://github.com/larissakcarvalho/frontend-projeto/pull/6) — mesclado na branch `main`; publicação atualizada.
- **Finalização da documentação:** [PR #8](https://github.com/larissakcarvalho/frontend-projeto/pull/8) — mesclado na branch `main`.
- **Deploy:** configurado em um único projeto Vercel, [frontend-projeto-scne](https://vercel.com/larissakcarvalho/frontend-projeto-scne), conectado à branch `main`. A aplicação publicada e os previews de PR usam esse projeto.
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

O catálogo consulta a API própria em `https://store-backend-projeto.vercel.app`:

- `GET /v1/product/search?limit=-1` carrega todos os produtos habilitados.
- `GET /v1/category/search?limit=-1` carrega as categorias.

O adaptador em `src/services/productApi.js` converte a resposta do backend para o formato usado pelos componentes da loja: as categorias são resolvidas pelos IDs; `price` e `price_with_discount` alimentam os preços atual e original; as imagens e opções são extraídas das associações de produto. Caminhos de imagem servidos pelo backend em `/media/` são convertidos em URLs absolutas. Busca por texto, categoria, preço e ordenação são aplicadas no cliente aos dados carregados.

Em desenvolvimento, o Vite encaminha `/api` para a API publicada para evitar bloqueios de CORS. Para apontar a aplicação a outro ambiente, defina `VITE_API_URL` antes de iniciar ou compilar o Vite (por exemplo, `http://localhost:3000`). Sem essa configuração, a compilação de produção utiliza `https://store-backend-projeto.vercel.app`.

Se a API estiver indisponível, a loja informa o problema e continua com os produtos locais de demonstração de `src/data/products.js`, oferecendo uma opção para tentar novamente. Imagens remotas e fontes tipográficas também dependem de conexão com a internet. A integração é somente de leitura e não realiza pedidos.

A aplicação não integra autenticação ou processamento real de pagamentos; cadastro, login e compra são demonstrativos.

### Publicação e validação da integração

A integração foi publicada na branch `main` em 6 de novembro de 2026 no commit [`d13cade`](https://github.com/larissakcarvalho/frontend-projeto/commit/d13cade863bf4066a2b601e4aea44f70b2d5acf3). A compilação e o lint foram executados localmente, e o site publicado foi verificado carregando os oito produtos do catálogo do backend, inclusive a página de detalhes de um produto. O catálogo de demonstração continua disponível como fallback quando a API não responde.

## Estrutura do código

- `src/components/`: componentes compartilhados, como cabeçalho, logo, galeria, filtros e cartões de produtos.
- `src/pages/`: páginas da loja e o layout comum entre elas.
- `src/data/`: dados locais e funções auxiliares do catálogo.
- `src/services/`: integração com APIs externas e adaptação dos dados recebidos.
- `public/` e `src/assets/`: ícones e imagens utilizados pela aplicação.

## Backend

A API REST com Express, MySQL, Sequelize, migrations, autenticação JWT e documentação Swagger fica em [`backend/`](backend/README.md). O frontend usa os endpoints públicos de leitura da API e continua executável sem ela graças ao catálogo local de demonstração.

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
