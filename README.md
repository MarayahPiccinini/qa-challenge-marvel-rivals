# 🦸‍♂️ Marvel Rivals Hub — Test Automation Suite

Este repositório contém a estratégia e a suíte de testes automatizados para o produto **Marvel Rivals Hub**, englobando validações de ponta a ponta na API REST (Backend) e na interface gráfica (Frontend).

A solução foi desenvolvida utilizando **Playwright** com **JavaScript/TypeScript**, priorizando a sustentabilidade do código, execução contínua (CI/CD) e o princípio da Pirâmide de Testes.

---

## 🎯 1. Estratégia de Testes & Arquitetura

A estratégia foi desenhada com foco em **Priorização por Risco** e **Testes em Camadas**, garantindo uma cobertura eficiente sem inflar o custo de manutenção.

### 📊 Pirâmide de Testes Aplicada
- **API (Backend):** Concentra a maior parte das validações de regras de negócio, contratos de dados (JSON Schema) e tempos de resposta. São testes extremamente rápidos, estáveis e de baixo custo de execução.
- **UI (Frontend):** Focada estritamente nos fluxos críticos da jornada do usuário (Smoke Tests), como o carregamento inicial das páginas e a navegação principal, mitigando a fragilidade inerente aos testes de interface.

### 🏗️ Organização do Projeto (Clean Architecture & POM)
A estrutura de pastas foi projetada de forma modular e sustentável:
- `src/api/`: Testes isolados dos endpoints de heróis, buscas e detalhes.
- `src/ui/`: Cenários de interface utilizando o padrão **Page Object Model (POM)** para desacoplar seletores e ações da lógica do teste.

---

## 🛠️ 2. Pré-requisitos & Instalação

Antes de executar os testes, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passo a Passo

1. **Clone o repositório:**
   git clone https://github.com/MarayahPiccinini/qa-challenge-marvel-rivals.git
   cd qa-challenge-marvel-rivals

2. **Obtenha a Chave de API (API Key):**
   Para executar os testes da API, é obrigatório utilizar um token de autenticação.
   - Acesse o portal https://marvelrivalsapi.com/ e faça a sua autenticação (login).
   - No seu painel, gere uma nova **API Key**.
   - Crie um arquivo chamado `.env` na raiz do projeto e insira a chave gerada da seguinte forma:
     MARVEL_API_KEY=cole_sua_chave_aqui

3. **Instale as dependências do projeto:**
   npm install

4. **Instale os navegadores do Playwright:**
   npx playwright install --with-deps

5. **Execute a suíte de testes:**
   Para rodar todos os testes em modo *headless* (sem abrir o navegador) e gerar o relatório:
   npx playwright test

---
**📚 Documentação de Apoio**
Para consultas detalhadas sobre os *endpoints*, parâmetros e contratos esperados, acesse a documentação oficial da API: https://docs.marvelrivalsapi.com/