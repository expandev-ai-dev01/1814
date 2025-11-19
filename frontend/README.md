# Catálogo de Carros

Listagem de carros, onde ao clicar no card consigo ver detalhes e preencher um formulário de contato.

## Tecnologias

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.2
- Tailwind CSS 4.1.17
- React Router DOM 7.9.6
- TanStack Query 5.90.2
- Zustand 5.0.8
- React Hook Form 7.66.1
- Zod 4.1.12
- Axios 1.13.2

## Estrutura do Projeto

```
src/
├── assets/          # Estilos globais e assets
├── core/            # Componentes, hooks e utilitários compartilhados
├── domain/          # Módulos de domínio (features)
├── layouts/         # Layouts da aplicação
├── pages/           # Páginas da aplicação
├── router/          # Configuração de rotas
├── App.tsx          # Componente raiz
└── main.tsx         # Entry point
```

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Funcionalidades

- **Listagem de carros**: Exibição de todos os veículos disponíveis no catálogo
- **Visualização de detalhes**: Página com informações detalhadas do veículo
- **Formulário de contato**: Formulário para manifestar interesse no veículo

## Arquitetura

O projeto segue uma arquitetura modular baseada em domínios:

- **Core**: Componentes e utilitários reutilizáveis
- **Domain**: Módulos de negócio isolados
- **Pages**: Páginas da aplicação
- **Layouts**: Estruturas de layout compartilhadas

## Padrões de Código

- TypeScript strict mode
- Componentes funcionais com hooks
- Gerenciamento de estado com Zustand
- Validação de formulários com Zod
- Estilização com Tailwind CSS
- Requisições HTTP com Axios e TanStack Query