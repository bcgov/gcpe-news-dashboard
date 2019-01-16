import { SocialMediaListInputPage } from './social-media-list-input.po';

describe('Social Media List Input Page', () => {
  let page: SocialMediaListInputPage;

  beforeAll(() => {
    page = new SocialMediaListInputPage();
    page.navigateTo();
  });

  it('should display page title text', () => {
    expect(page.getPageTitleText()).toEqual('Update Social Media List');
  });

  it('should have proper sub nav item selected', () => {
  });

  it('should have theme list', () => {
  });
});
