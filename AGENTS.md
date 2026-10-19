# Orientações do projeto

## Contexto
- Loja demonstrativa em React 19 e Vite; consulte [README.md](README.md) para requisitos, páginas, execução e publicação.
- A entrada React está em `src/main.jsx`. As páginas, navegação e estado da sacola ficam em `src/App.jsx`; os produtos e `formatPrice` ficam em `src/data/products.js`.
- Não há roteador, API, autenticação ou checkout real. A navegação usa `history.pushState` e trata os caminhos dentro de `App.jsx`; preserve as rotas em português e inglês e seus parâmetros de busca/categoria ao alterá-la.
- As imagens e fontes vêm de serviços externos e precisam de internet.

## Desenvolvimento e validação
- Use `npm install` para instalar dependências, `npm run dev` para iniciar o Vite, `npm run lint` para lint e `npm run build` para validar a compilação.
- Não há script de testes configurado. Rode lint e build após mudanças relevantes.
- O deploy usa fallback de rotas para a SPA em `vercel.json`; mantenha o comportamento de acesso direto a rotas do cliente.

## Convenções locais
- Siga os componentes e o estilo existentes em `src/App.jsx`, `src/App.css` e `src/index.css`; mantenha a apresentação responsiva e os estados acessíveis já usados nos controles.
- Edite os dados de catálogo em `src/data/products.js`, em vez de duplicá-los nos componentes.