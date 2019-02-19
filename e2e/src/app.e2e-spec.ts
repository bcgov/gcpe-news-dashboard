<<<<<<< HEAD
import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {

    browser.waitForAngularEnabled(false);
    page = new AppPage();
  });

  it('should display app title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('BC Gov News');
  });
});
||||||| merged common ancestors
=======
import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {

    browser.waitForAngularEnabled(false);
    page = new AppPage();
  });

  it('should display app title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('BC Gov News');
  });
});
>>>>>>> ab01ff450d2a7e023069259ba0da7e1ea1256db4
