# Ecos do Medo - Acervo Arquivistico (Site Estatico)

Projeto em HTML, CSS e JavaScript puro para um acervo ficticio de RPG com estetica de arquivo confidencial.

## Estrutura

- `index.html` - pagina principal com busca, filtros e cards
- `styles.css` - visual arquivistico, responsivo e acessivel
- `app.js` - carga de dados, busca, filtros e paginacao
- `data/items.json` - base de dados com os itens do acervo
- `document.html` - template para abrir documentos por `?slug=`
- `docs/content/*.html` - conteudos textuais dos documentos

## Como rodar localmente

Como o projeto usa `fetch()` para ler JSON/HTML local, abra com servidor HTTP (nao via `file://`).

Opcao recomendada (npm):

```bash
npm run dev
```

Depois abra:

- `http://localhost:5500`

Alternativas:

```bash
python -m http.server 5500
```

```bash
npx serve .
```

## Deploy gratis

### GitHub Pages

1. Suba os arquivos para um repositorio no GitHub.
2. Va em `Settings > Pages`.
3. Em `Build and deployment`, escolha:
   - `Source: Deploy from a branch`
   - Branch: `main` (root)
4. Salve e aguarde o link publico.

### Netlify

1. Acesse Netlify e clique em `Add new site > Import an existing project`.
2. Conecte ao repositorio.
3. Build command: vazio
4. Publish directory: `.`
5. Deploy.

### Vercel

1. Importe o repositorio no Vercel.
2. Framework preset: `Other`.
3. Build command: vazio.
4. Output directory: `.`
5. Deploy.

## Observacoes

- Ordenacao padrao: documentos mais recentes primeiro (`date` desc).
- Busca em: `title`, `author`, `tags`, `excerpt`, `id`.
- Filtros ativos: `type`, `classification`, `risk`.
- Paginacao: 9 cards por vez com botao `Carregar mais`.
- Alguns documentos possuem conteudo de exemplo; os demais exibem fallback.

