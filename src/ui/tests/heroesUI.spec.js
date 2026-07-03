const { test, expect } = require('@playwright/test');
const { HeroesPage } = require('../pages/HeroesPage');

test.describe('Marvel Rivals - Página de Heróis', () => {
  let heroesPage;

  test.describe('Renderização e Navegação', () => {
    test.beforeEach(async ({ page }) => {
      heroesPage = new HeroesPage(page);
      await heroesPage.navigate(); 
    });

    test('UI-01: Deve carregar a página inicial corretamente (Smoke Test)', async ({ page }) => {
      await expect(page).toHaveURL(/.*heroes/);
      await expect(page).toHaveTitle(/Marvel Rivals/i);
      
      const mainContainer = page.locator('.wrap.heroesDetails');
      await expect(mainContainer).toBeVisible();
    });

    test('UI-02: Deve exibir a lista de heróis renderizada', async ({ page }) => {
      const heroCards = page.locator('.more-btn'); 
      await expect(heroCards.first()).toBeVisible();
      expect(await heroCards.count()).toBeGreaterThan(0);
    });

    test('UI-03: Deve navegar para a página de detalhes ao clicar no card', async ({ page }) => {
      const firstHero = page.locator('.hero-details .jyImg').first();
      await firstHero.click();
      
      const heroModal = page.locator('.hero-details .jyImg');
      await expect(heroModal).toBeVisible();
    });
  });

  test.describe('Filtros de Heróis', () => {
    test('UI-04: Validar filtros disponíveis', async ({ page }) => {
      await page.goto('https://www.marvelrivals.com/heroes_data/');

      const dropdownTrigger = page.locator('.hero-type-h');
      await dropdownTrigger.click();

      const duelistFilterBtn = page.locator('.hero-type-btn-item', { hasText: 'Vanguard' }); 
      await duelistFilterBtn.click();
      
      await expect(duelistFilterBtn).toHaveClass(/cur/);

      const heroCards = page.locator('.list-item'); 
      const roleContainer = heroCards.first().locator('.role-type-con'); 
      
      await expect(roleContainer).toContainText('Vanguard');
    });
  });

  test.describe('Acessibilidade e Mobile', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.marvelrivals.com/heroes/index.html?id=b3e3bc0b-0a15-4fa8-8139-e08f7fcd9beb');
    });

    test('UI-06: Validar responsividade básica', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      
      const mobileMenu = page.locator('.wrap.heroesDetails'); 
      await expect(mobileMenu).toBeVisible();
    });

    test('UI-07: Todas as imagens de heróis devem conter atributo alt', async ({ page }) => {
      const heroImages = page.locator('.jyImg img');
      
      await expect(heroImages.first()).toBeVisible();
      
      const count = await heroImages.count();
      
      for (let i = 0; i < count; i++) {
        const altText = await heroImages.nth(i).getAttribute('alt');
        expect(altText, `Imagem no índice ${i} está sem atributo alt`).not.toBeNull(); 
      }
    });
  });
});