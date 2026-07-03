# Matriz de Cenários — Marvel Rivals Hub

Legenda **Automatizar**: ✅ Automatizado nesta entrega · 🔍 Exploratório/manual (documentado, não automatizado) · ➖ Não aplicável nesta entrega

| ID | Cenário | Camada | Prioridade | Automatizar | Justificativa |
|---|---|---|:---:|:---:|---|
| HERO-01 | Listar heróis com sucesso | API | P0 | ✅ | Caminho principal do produto; base de tudo o mais. |
| HERO-02 | Validar estrutura da resposta (schema: id, name, role, abilities, imageUrl) | API | P0 | ✅ | Contrato quebrado derruba o front inteiro; alto risco (R1). |
| HERO-03 | Validar quantidade de registros retornados | API | P2 | ✅ (assert `> 0`, não valor fixo) | Contar exato é frágil (R6 — roster muda a cada patch); validamos que a lista não é vazia e é uma lista. |
| HERO-04 | Validar comportamento sem resultados | API | P1 | ✅ | Cobre borda de busca vazia, prevê UX quebrada. |
| HERO-05 | Avaliar tempo de resposta da API | API | P2 | ✅ (smoke, threshold generoso) | Não é teste de carga formal, apenas guarda-chuva de regressão de performance. |
| BUS-01 | Buscar herói por nome | API | P0 | ✅ | Segunda funcionalidade mais usada do produto. |
| BUS-02 | Buscar herói por trecho do nome | API | P1 | ✅ | Cobre busca parcial, comum na experiência real. |
| BUS-03 | Buscar herói inexistente | API | P1 | ✅ | Risco R4 — tratamento de "não encontrado". |
| BUS-04 | Buscar com campo vazio | API | P1 | ✅ | Borda comum de input do usuário. |
| BUS-05 | Buscar com caracteres especiais | API | P3 | ✅ | Baixa probabilidade real de uso; validado exploratoriamente para checar que não gera erro 500. |
| UI-01 | Validar carregamento da página | UI | P0 | ✅ | Smoke básico de disponibilidade. |
| UI-02 | Validar exibição da lista de heróis | UI | P0 | ✅ | Caminho principal do usuário na interface. |
| UI-03 | Validar navegação para detalhes | UI | P0 | ✅ | Fluxo crítico de clique no herói → exibição de detalhe/ability panel. |
| UI-04 | Validar filtros disponíveis | UI | P1 | ✅ | Funcionalidade de busca visual, alto uso. |
| UI-06 | Validar responsividade básica | UI | P2 | ✅ (2 viewports: desktop/mobile) | Baixo custo de automação com `page.setViewportSize`, alto valor. |
| UI-07 | Validar acessibilidade básica | UI | P3 | ✅ | Auditoria completa de acessibilidade está fora do escopo do case; checagem de `alt` incluída como smoke, auditoria profunda fica manual. |

---

## Cenários adicionais identificados (diferencial)

| ID | Cenário | Camada | Prioridade | Automatizar | Justificativa |
|---|---|---|:---:|:---:|---|
| HERO-06 | Validar que a API exige `x-api-key` (401/403 sem chave) | API | P1 | 🔍 | Risco R2 não coberto pelo case original; é comportamento de segurança básico da API. |
| HERO-07 | Validar headers de resposta (Content-Type: application/json) | API | P3 | 🔍 | Baixo risco, checagem rápida manual via Postman/DevTools. |
| BUS-06 | Busca case-insensitive (ex.: "iron man" vs "Iron Man") | API | P1 | 🔍 | Comportamento comum esperado pelo usuário; risco de UX se não suportado. |
| UI-09 | Persistência do termo buscado após navegação de volta (back) | UI | P2 | 🔍 | Comportamento de SPA, validado exploratoriamente por não ser requisito explícito do case. |
| API-RATE | Validar comportamento ao atingir rate limit | API | P3 | 🔍 | Difícil de reproduzir de forma a determinar o CI sem afetar terceiros; documentado como teste manual pontual. |

---

## Resumo quantitativo

- Total de cenários avaliados: 18
- Automatizados: 13
- Teste com 3 navegadores diferentes totais: 39
- Exploratórios/manuais (justificados): 5
- Cobertura por camada automatizada: API 7· UI 6
