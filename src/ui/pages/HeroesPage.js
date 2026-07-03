class HeroesPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.marvelrivals.com/heroes/index.html';
    this.firstHeroCard = page.locator('.hero-list .hero-item').first(); 
  }

  async navigate() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  async openFirstHeroDetails() {
    await this.firstHeroCard.click();
  }
}

module.exports = { HeroesPage };