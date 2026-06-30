class HeroesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://www.marvelrivals.com/heroes/index.html';
    
    // Escopo do locator definido de forma genérica para evitar quebra caso o ID do elemento mude
    this.firstHeroCard = page.locator('.hero-list .hero-item').first(); 
  }

  async navigate() {
    // Aguardando domcontentloaded em vez de networkidle para otimizar o tempo de execução do teste
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  async openFirstHeroDetails() {
    // Workaround: A grid de heróis costuma ter um leve delay de renderização (lazy load).
    // Esse wait explícito garante que o Playwright não clique no vazio.
    await this.firstHeroCard.waitFor({ state: 'visible' });
    await this.firstHeroCard.click();
  }
}

module.exports = { HeroesPage };