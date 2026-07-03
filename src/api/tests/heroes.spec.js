const { test, expect } = require('@playwright/test');
const { MarvelApiClient } = require('../clients/MarvelApiClient');

test.describe('Marvel Rivals - API de Heróis', () => {
  let api;

  test.beforeEach(({ request }) => {
    api = new MarvelApiClient(request);
  });

  test.describe('6.1 - Listagem Geral', () => {
    
    test('HERO-01: Listar heróis com sucesso', async () => {
      const response = await api.get('/heroes');
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);
    });

    test('HERO-02: Validar estrutura completa da resposta', async () => {
      const response = await api.get('/heroes');
      const body = await response.json();
      const hero = body[0];

      expect(typeof hero.id).toBe('string');
      expect(typeof hero.name).toBe('string');
      expect(typeof hero.real_name).toBe('string');
      expect(typeof hero.imageUrl).toBe('string');
      expect(typeof hero.role).toBe('string');
      
      if (hero.team?.length > 0) {
        expect(typeof hero.team[0]).toBe('string');
      }

      if (hero.abilities?.length > 0) {
        const ability = hero.abilities[0];
        expect(typeof ability.id).toBe('number');
        expect(typeof ability.name).toBe('string');
        expect(ability.additional_fields).toBeInstanceOf(Object);
      }
    });

    test('HERO-05: Avaliar tempo de resposta da API', async () => {
    const startTime = Date.now();
    const response = await api.get('/heroes');
    const latency = Date.now() - startTime;

    expect(response.status()).toBe(200);
    expect(latency).toBeLessThan(2000); 
  });
  });

  test.describe('6.2 - Busca por Herói', () => {
    const BASE_PATH = '/heroes/hero'; 

    test('BUS-01: Buscar herói por nome', async () => {
      const response = await api.get(`${BASE_PATH}/hulk`);
      expect(response.status()).toBe(200);
      
      const body = await response.json();
      expect(body).toBeInstanceOf(Object);
      expect(body.name).toBe('hulk');
    });

    test('BUS-02: Buscar herói por trecho do nome', async () => {
      const response = await api.get(`${BASE_PATH}/hul`);
      expect(response.status()).toBe(404);
    });

    test('BUS-03: Buscar herói inexistente', async () => {
      const response = await api.get(`${BASE_PATH}/HeroiQueNaoExiste123`);
      expect(response.status()).toBe(404); 
    });

    test('BUS-04: Buscar com campo vazio', async () => {
      const response = await api.get(`${BASE_PATH}/`);
      expect([400, 404]).toContain(response.status());
    });
  });

});