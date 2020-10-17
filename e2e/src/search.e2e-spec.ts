import { SearchPage } from './search.po';
import {browser} from 'protractor';

describe('Wyszukiwanie ngAuction', () => {
  let searchPage: SearchPage;

  beforeEach(() => {
    searchPage = new SearchPage();
  });

  it('powinno przeprowadzać wyszukiwanie produków z przedziału cenowego od 10 do 100 dolarów', async () => {
    searchPage.navigateToLandingPage();
    let url = await browser.getCurrentUrl();
    expect(url).toContain('/categories/wszystkie%20produkty');

    searchPage.performSearch(10, 100);
    url = await browser.getCurrentUrl();
    expect(url).toContain('/search-results?minPrice=10&maxPrice=100');

    const firstProductPrice = await searchPage.getFirstProductPrice();
    expect(firstProductPrice).toBeGreaterThan(10);
    expect(firstProductPrice).toBeLessThan(100);
  });
});






/*
import { SearchPage } from './search.po';
import {browser} from 'protractor';

describe('Strona główna', () => {
  let searchPage: SearchPage;

  beforeEach(() => {
    searchPage = new SearchPage();
    browser.waitForAngularEnabled(false);
  });

  it('powinna nawigować do strony głównej i otwierać panel wyszukiwania', async () => {
    await searchPage.navigateToLanding();
    let url = await browser.getCurrentUrl();
    console.log('url1: ' + url);
    expect(url).toContain('/categories/wszystkie%20produkty');

    await searchPage.performSearch();
    url = await browser.getCurrentUrl();
    console.log('url2: ' + url);
    expect(url).toContain('/search');
  });
});
*/
