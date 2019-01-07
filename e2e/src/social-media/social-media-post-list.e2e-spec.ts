import { SocialMediaPostListPage } from './social-media-post-list.po';

describe('Social Media Post List Page', () => {
  let page: SocialMediaPostListPage;

  beforeAll(() => {
    page = new SocialMediaPostListPage();
    page.navigateTo();
  });

  it('should display header text', () => {
    expect(page.getHeadingText()).toEqual('HQ Dashboard');
  });

  it('should have proper sub nav item selected', () => {
    expect(page.getSelectedSubNavItem()).toEqual('SOCIAL MEDIA');
  });

  it('should have theme list', () => {
    
  });
});
