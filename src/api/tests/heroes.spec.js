const { test, expect } = require('@playwright/test');

// TODO: Mover para variável de ambiente (.env) em uma futura esteira de CI
const BASE_URL = 'https://marvelrivalsapi.com/api/v1'; 

test.describe('API - Marvel Rivals Heroes', () => {

  test('HERO-01: Deve retornar sucesso e validar contrato base da listagem', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/heroes`);

    // Validação crítica de disponibilidade
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Garante que a API não retornou um array vazio silenciosamente
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
    
    // Validando apenas os campos essenciais do contrato. 
    // Evitamos validar o payload inteiro aqui para não gerar testes frágeis (flaky) a cada novo herói.
    const primeiroHeroi = responseBody[0];
    expect(primeiroHeroi).toHaveProperty('name');
    expect(primeiroHeroi).toHaveProperty('id');
  });

});