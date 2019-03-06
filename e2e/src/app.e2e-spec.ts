import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {

    browser.waitForAngularEnabled(false);
    page = new AppPage();
  });
/*
  it('should display app title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('BC Gov News');
  });
});
*/
