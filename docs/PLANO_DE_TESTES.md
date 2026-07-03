# Plano de Teste — Marvel Rivals Hub

**Candidato(a):** Marayah Mikaela Piccinini Pintos
**Vaga:** Analista de Qualidade Pleno — Engenharia de Plataforma (SDLC)
**Produto sob teste:** Marvel Rivals Hub (API: marvelrivalsapi.com · Front: marvelrivals.com/heroes)
**Ferramenta de automação:** Playwright (JavaScript) — camadas API + UI

---

## 1. Objetivo

Definir a estratégia de teste para validar o hub de heróis do Marvel Rivals, cobrindo API REST e frontend web, com foco em priorização por risco, automação sustentável e execução contínua.

Este plano não busca cobertura 100% dos cenários listados no case — busca cobertura **inteligente**: os cenários de maior risco e maior recorrência de uso são priorizados e automatizados; cenários de baixo risco/baixo retorno são documentados como testados manualmente ou como débito consciente.

---

## 2. Escopo

### Dentro do escopo
- API Marvel Rivals (`GET /api/v1/heroes`, `GET /api/v1/heroes/{hero}`, busca/detalhe de herói)
- Frontend público de heróis (`marvelrivals.com/heroes/index.html`): listagem, busca/filtro, navegação para detalhe

### Fora do escopo
- Autenticação de usuário / conta NetEase (login está atrás de client próprio, fora do alcance de teste automatizado público)
- Endpoints de gameplay, partidas, stats de jogador, loja — não fazem parte do desafio
- Testes de carga/performance formal (apenas tempo de resposta básico como smoke)
- Testes de segurança (pentest) — fora do escopo do case

---

## 3. Riscos Identificados

| ID | Risco | Probabilidade | Impacto | Prioridade |
|----|-------|:---:|:---:|:---:|
| R1 | API é **não oficial**, mantida por terceiros — pode mudar contrato/schema sem aviso | Média | Alto | **Alta** |
| R2 | API requer `x-api-key` — cenários sem chave válida (401/403) não são cobertos por padrão nos exemplos do case, mas quebram integração real se não tratados | Média | Alto | **Alta** |
| R3 | Frontend é uma SPA fortemente dependente de JS/canvas para renderizar heróis — seletores DOM podem ser instáveis (elementos com `href="javascript:;"`, sem `data-testid`) | Alta | Alto | **Alta** |
| R4 | Ausência de resultados na busca (herói inexistente) pode não ter tratamento visual claro (risco de tela em branco silenciosa) | Média | Médio | Média |
| R5 | Falha de carregamento da API não tratada no front pode quebrar a experiência sem feedback ao usuário | Média | Alto | **Alta** |
| R6 | Volume de heróis pode crescer/mudar a cada patch do jogo — asserts "hard-coded" de quantidade/nome quebram facilmente | Alta | Médio | Média |
| R7 | Imagens dos heróis podem falhar silenciosamente (broken image) sem gerar erro de console | Baixa | Baixo | Baixa |
| R8 | Rate limit da API pode derrubar a suíte em execução contínua (CI) | Média | Médio | Média |

**Critério de priorização:** Prioridade = Probabilidade × Impacto, com ajuste para cenários que protegem o **caminho principal do usuário** (listar → buscar → ver detalhe).

---

## 4. Estratégia de Testes por Camada

```
        ▲  Poucos, lentos, caros
        │
   E2E UI (Playwright)         → fluxos críticos do usuário (listar, buscar, navegar ao detalhe)
        │
   Integração (API + contrato) → estrutura de resposta, status codes, paginação/campos
        │
   API unitária (contrato)     → cada endpoint isolado, casos de borda, erros
        │
        ▼  Muitos, rápidos, baratos
```

- **API (base da pirâmide):** cobre a maior parte dos cenários de negócio (listagem, busca, detalhe, erros, estrutura de resposta). Rápida, estável, não depende de renderização.
- **UI (topo da pirâmide):** cobre apenas os fluxos que **precisam** ser validados pela experiência real do usuário — carregamento da página, exibição da lista, navegação, busca visual, responsividade e acessibilidade básica. Não duplicamos validação de regra de negócio já coberta na API.
- **Transversais:** aplicados nas duas camadas onde fizer sentido (loading/erro/timeout, evitando dependência de estado real da API de terceiros).

---

## 5. Critérios de Priorização

Cada cenário da matriz (seção 6) recebe prioridade:

- **P0 (crítico):** bloqueia o fluxo principal do usuário ou é regra de negócio central (ex.: listar heróis, buscar herói, ver detalhe).
- **P1 (alto):** cobre borda relevante e frequente (busca vazia, herói inexistente, erro de API).
- **P2 (médio):** cobre robustez/qualidade (responsividade, performance básica, múltiplos cliques).
- **P3 (baixo):** cobre nice-to-have ou baixa probabilidade de ocorrência (acessibilidade avançada, casos exóticos de caracteres especiais).

Critério de automação: **automatizamos P0 e P1 sempre; P2 quando o custo de automação for baixo; P3 fica documentado como teste exploratório manual.**

---

## 6. Distribuição por Camada (resumo)

| Camada | Nº de cenários selecionados | Automatizado |
|---|:---:|:---:|
| API | 7 | Sim (Playwright `request` fixture) |
| UI | 6 | Sim (Playwright `page`) |
| Manual/Exploratório | 5 | Não (documentado na matriz) |

Detalhamento completo em `MATRIZ_DE_CENARIOS.md`.

---

## 7. Abordagem de Automação

- **Ferramenta:** Playwright (JavaScript), usando `@playwright/test` para ambas as camadas (API via `request` context, UI via `page`), evitando duas stacks diferentes.
- **Estrutura por Page Object** simplificado (`HeroesPage`) para isolar seletores da lógica de teste (mitiga R3 — se o front mudar seletor, ajusta-se em um único lugar).
- **CI/CD:** pipeline de exemplo em `.github/workflows/playwright.yml`, rodando em push/PR.

---

## 8. Sustentabilidade da Suíte

- Seletores baseados em texto/atributo estável (`alt`, classes e texto visível) em vez de índices de DOM frágeis, já que o site não expõe `data-testid`.
- Asserts de contrato de API focados em **campos essenciais e tipos**, não em snapshot completo do JSON (que quebraria a cada novo herói lançado).
- Secrets via `.env` (chave de API) — nunca hardcoded.
- Relatório HTML do Playwright + trace on-first-retry para debugging rápido de falhas em CI.

---

## 9. Uso de IA neste desafio

- Aceleração no desenvolvimento: Criação de esqueletos estruturais e auxílio na sintaxe dos testes automatizados.
- Otimização de tempo: Delegação de padronizações mecânicas e execução de tarefas operacionais para focar na qualidade analítica.
- Controle e estratégia: A arquitetura da solução, a definição de escopo, a priorização de riscos e as escolhas técnicas foram direcionadas exclusivamente por inteligência e julgamento humanos.

