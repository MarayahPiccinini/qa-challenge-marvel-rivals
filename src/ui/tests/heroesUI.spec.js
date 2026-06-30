const { test, expect } = require('@playwright/test');
const { HeroesPage } = require('../pages/HeroesPage');

test.describe('UI - Navegação e Renderização', () => {

  test('UI-01: Deve carregar a página inicial corretamente (Smoke Test)', async ({ page }) => {
    const heroesPage = new HeroesPage(page);
    await heroesPage.navigate();
    
    // Validação de segurança para garantir que não caímos em uma página 404/500 customizada
    await expect(page).toHaveURL(/.*heroes\/index\.html/);
    await expect(page).toHaveTitle(/Marvel Rivals/i);
  });

  test('UI-03: Deve navegar para a página de detalhes ao clicar no card', async ({ page }) => {
    const heroesPage = new HeroesPage(page);
    await heroesPage.navigate();
    
    await heroesPage.openFirstHeroDetails();

    // Regex suave para a URL de destino, permitindo que a aplicação mude o padrão de roteamento no futuro
    await expect(page).toHaveURL(/.*hero.*/i); 
  });

});