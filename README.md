# 🐊 MANGATOR — Plataforma Moderna de Leitura de Mangás

<div align="center">

<img src="https://raw.githubusercontent.com/ryuclover/mangator/main/docs/screenshots/01_home_catalog.png" alt="MANGATOR Banner" width="100%" />

<br/><br/>

[![Status do Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://mangator.vercel.app)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Licença: MIT](https://img.shields.io/badge/Licença-MIT-00F5A0?style=for-the-badge)](LICENSE)

**Aplicação web de alta performance desenvolvida para leitura imersiva de mangás, webtoons e quadrinhos, unindo um acervo histórico curado em domínio público a um motor dinâmico com requisições e capítulos atualizados em tempo real.**

[🚀 Acessar o Site em Produção (mangator.vercel.app)](https://mangator.vercel.app)

</div>

---

## 🎯 Sobre o Projeto

O **MANGATOR** foi construído para resolver os principais gargalos das plataformas tradicionais de leitura online: excesso de poluição visual, lentidão de carregamento, anúncios intrusivos e interfaces ultrapassadas.

Com uma identidade visual exclusiva inspirada na estética **Obsidian & Neon Emerald** (`#00F5A0`), a plataforma oferece uma experiência premium tanto para quem deseja apreciar clássicos restaurados quanto para quem acompanha lançamentos semanais de obras populares.

---

## 📸 Demonstração Visual da Aplicação

### 1. Catálogo e Página Inicial
Visualização dinâmica em grade ou linhas, com banners em destaque, ranking dos mais lidos por período e filtros por formato (Mangá, Manhwa, Manhua).

<p align="center">
  <img src="https://raw.githubusercontent.com/ryuclover/mangator/main/docs/screenshots/01_home_catalog.png" alt="Catálogo MANGATOR" width="100%" />
</p>

---

### 2. Visão Detalhada da Obra e Capítulos
Página completa com metadados detalhados (sinopse, status, autores, tags), sincronização de volumes e lista interativa de capítulos.

<p align="center">
  <img src="https://raw.githubusercontent.com/ryuclover/mangator/main/docs/screenshots/02_manga_details.png" alt="Detalhes da Obra" width="100%" />
</p>

---

### 3. Leitor Imersivo em Cascata (Webtoon / Vertical Scroll)
Leitura fluida sem quebras de página, com pré-carregamento contínuo inteligente, barra flutuante de progresso, navegação rápida entre capítulos e atalhos de teclado.

<p align="center">
  <img src="https://raw.githubusercontent.com/ryuclover/mangator/main/docs/screenshots/03_reader_cascade.png" alt="Leitor em Cascata" width="100%" />
</p>

---

### 4. Coleção Pessoal e Favoritos
Gerenciamento de títulos marcados pelo leitor, com contadores atualizados e persistência automática no armazenamento local do navegador.

<p align="center">
  <img src="https://raw.githubusercontent.com/ryuclover/mangator/main/docs/screenshots/04_bookmarks.png" alt="Meus Favoritos" width="100%" />
</p>

---

### 5. Manifesto e Informações do Projeto
Modal explicativo sobre a missão de preservação, transparência das fontes e detalhes da arquitetura.

<p align="center">
  <img src="https://raw.githubusercontent.com/ryuclover/mangator/main/docs/screenshots/05_about_modal.png" alt="Sobre o Projeto" width="100%" />
</p>

---

## ⚡ Principais Funcionalidades

- 📖 **Leitor de Alta Performance**:
  - **Modo Cascata (Padrão)**: Rolagem vertical suave e infinita, perfeita para webtoons e leitura dinâmica em smartphones ou monitores convencionais.
  - **Modo Página Única**: Visualização clássica focada em uma página por vez com transição lateral rápida (`←` e `→`).
  - **Atalhos e Controles**: Barra de progresso em tempo real, seletor suspenso de capítulos e controle de iluminação/zoom.
- 🐊 **Dois Modos de Operação Integrados (Persistência Automática)**:
  - **Modo 1 (Acervo Clássico & Domínio Público)**: Obras históricas preservadas (Hokusai Manga, Tagosaku to Mokube, Dracula de Bram Stoker, Carmilla, H.P. Lovecraft) com scans reais e opção de download em formato `.CBZ` / `.ZIP`.
  - **Modo 2 (Rede Online em Tempo Real)**: Conexão direta via proxy serverless para busca e leitura de milhares de mangás populares atualizados continuamente.
  - **Memória Local**: A preferência de modo é salva no `localStorage`, mantendo sua escolha mesmo ao sair ou recarregar a página.
- 🎨 **Interface Moderna e Responsiva**:
  - Estética Dark Obsidian com acentos em Verde Esmeralda Neon (`#00F5A0`).
  - Efeitos refinados de vidro translúcido (`backdrop-filter: blur`).
  - Totalmente adaptada para dispositivos móveis, tablets e desktops.
- 🔍 **Busca Dinâmica & Filtros**:
  - Busca instantânea conforme você digita.
  - Filtros por demografia e categoria (Mangá, Manhwa, Manhua, Shounen, Seinen, etc.).
  - Classificação por popularidade diária, semanal e mensal.

---

## 🛠️ Tecnologias Utilizadas

| Camada | Ferramentas |
|---|---|
| **Interface / Frontend** | [React 19](https://react.dev/), [TypeScript 5/6](https://www.typescriptlang.org/), [Vite 8](https://vitejs.dev/) |
| **Estilização & Design** | Vanilla CSS moderno com Design Tokens, CSS Variables e Glassmorphism |
| **Componentes e Ícones** | [Lucide React](https://lucide.dev/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Processamento de Arquivos** | [JSZip](https://stuk.github.io/jszip/) para geração e empacotamento de arquivos `.CBZ` no navegador |
| **Backend & Proxy** | [Vercel Serverless Functions](https://vercel.com/) (Node.js) para bypass de CORS, streaming e decodificação |
| **Qualidade de Código** | [Oxlint](https://oxc.rs/) para análise estática ultra veloz |

---

## 📁 Estrutura de Pastas

```
mangator/
├── api/                       # Funções Serverless (Vercel)
│   ├── chapter-pages.ts       # Decodificador de imagens dos capítulos
│   ├── chapters.ts            # Sincronização dinâmica de capítulos
│   ├── mangafire.ts           # Motor de busca e catálogo online
│   └── proxy.ts               # Proxy de streaming e bypass de CORS
├── docs/                      # Ativos de documentação
│   └── screenshots/           # Capturas de tela em alta resolução
├── public/                    # Imagens estáticas, logotipos e favicon
└── src/
    ├── components/            # Componentes visuais do React
    │   ├── AboutModal.tsx     # Modal informativo do projeto
    │   ├── MangaCard.tsx      # Cards de apresentação (Modo Grade e Linha)
    │   ├── MangaDetail.tsx    # Tela de metadados e lista de capítulos
    │   ├── MangaReader.tsx    # Leitor interativo (Cascata e Página Única)
    │   ├── Navbar.tsx         # Barra de navegação, busca e toggle de modos
    │   └── PopularToday.tsx   # Painel lateral com os mais lidos
    ├── data/                  # Catálogo de domínio público e tipos TypeScript
    │   └── mangaData.ts
    ├── services/              # Camada de requisições e integração de dados
    │   └── onlineMangaService.ts
    ├── App.tsx                # Estado global da aplicação e orquestração
    ├── index.css              # Variáveis de cores, tipografia e reset
    └── main.tsx               # Ponto de inicialização do React
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior recomendada)
- **npm**, **pnpm** ou **yarn**

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ryuclover/mangator.git
   cd mangator
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Abra em seu navegador:**
   ```
   http://localhost:5173
   ```

### Scripts do Projeto

- `npm run dev`: Inicia o ambiente de desenvolvimento local com Hot Module Replacement (HMR).
- `npm run build`: Executa a verificação estrita do TypeScript e compila o bundle de produção.
- `npm run preview`: Permite testar localmente o pacote compilado da pasta `dist/`.
- `npm run lint`: Executa a checagem de boas práticas e sintaxe via Oxlint.

---

## 📜 Licença

Este projeto é distribuído sob os termos da licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

Feito com dedicação para entusiastas de mangás e preservação da literatura visual.

⭐ Se gostou do projeto, considere deixar uma estrela no repositório!

</div>
