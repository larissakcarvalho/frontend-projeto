# Digital Store

Loja virtual demonstrativa criada com React e Vite, com layout responsivo para desktop e dispositivos móveis.

## Projeto

- [Documentação oficial](https://github.com/digitalcollegebr/projeto-digital-store)
- [Design no Figma](https://www.figma.com/design/cfb4F7ZXMFQmvmTn3PKI4z/DRIP-STORE---DIGITAL-COLLEGE?node-id=22-30)

## Requisitos

- Node.js 20.19+ ou 22.12+
- npm

## Como executar

```bash
npm install
npm run dev
```

Abra no navegador o endereço indicado pelo Vite (normalmente `http://localhost:5173`).

## Páginas e funcionalidades

- Início (`/`): destaques, categorias, produtos selecionados e formulário de novidades.
- Produtos (`/products`): catálogo com busca (`?filter=`), filtros combináveis por categoria e faixa de preço, e ordenação por preço ou avaliação. `/produtos` também funciona.
- Produto (`/product/:id`): detalhes, galeria navegável, seleção de tamanho e cor, quantidade e inclusão na sacola. `/produto/:id` também funciona.
- Sacola: visualização dos itens, alteração de quantidades, subtotal e fluxo demonstrativo de compra.
- Navegação responsiva com menu móvel e busca acessível em telas pequenas.

Os produtos são dados locais em `src/data/products.js`. Imagens e tipografia são carregadas de serviços externos; por isso, precisam de conexão com a internet. Não há integração com API, autenticação ou processamento real de pagamentos.

## Entrega

Preencha os dados abaixo antes de enviar o projeto:

- **Integrantes:** Larissa Kelly de Carvalho.
- **Repositório no GitHub:** [frontend-projeto](https://github.com/larissakcarvalho/frontend-projeto).
- **Deploy (Vercel, Netlify ou similar):** link pendente de publicação.
- **Pull request:** link pendente de criação no repositório escolhido.
- **Prazo informado no enunciado:** 20/11/2026.

## Publicação

O projeto pode ser publicado em uma plataforma compatível com Vite, como Vercel ou Netlify. Configure o comando de build como `npm run build` e o diretório de saída como `dist`. Como a aplicação usa rotas do lado do cliente, configure o provedor para redirecionar as rotas não encontradas para `index.html`.

## Verificações

```bash
npm run lint
npm run build
```
