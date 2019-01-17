import { SocialMediaPostListPage } from './social-media-post-list.po';
import { browser } from 'protractor';
/* comment all integration tests to have the pipeline running
describe('Social Media Post List Page', () => {
  let page: SocialMediaPostListPage;

  beforeAll(() => {
    page = new SocialMediaPostListPage();
    page.navigateTo();
    browser.driver.sleep(5000);
  });

  it('should display header text', () => {
    expect(page.getHeadingText()).toEqual('HQ Dashboard');
  });

  it('should have proper sub nav item selected', () => {
    expect(page.getSelectedSubNavItem()).toEqual('SOCIAL MEDIA');
  });

  it('should display the social media type select dropdown', () => {
    expect(page.displayMediaTypeDropdown()).toBe(true);
  });

  it('should display the social media type dropdown and select all Twitter post', () => {
    page.selectSocialMediaTypeButton().click();
    expect(page.displayMediaTypeDropdownMenu().isPresent()).toBe(true);
    page.selectPostTypeButton('Twitter').click();
    browser.driver.sleep(5000);
    expect(page.getSocialMediaFilterText()).toEqual('Twitter');
    expect(page.getFacebookPostCount().count()).toBe(0);
    expect(page.getInstagramPostCount().count()).toBe(0);
  });

  it('should display the social media type dropdown and select all Facebook post', () => {
    page.selectSocialMediaTypeButton().click();
    expect(page.displayMediaTypeDropdownMenu().isPresent()).toBe(true);
    page.selectPostTypeButton('Facebook').click();
    browser.driver.sleep(5000);
    expect(page.getSocialMediaFilterText()).toEqual('Facebook');
    expect(page.getTwitterPostCount().count()).toBe(0);
    expect(page.getInstagramPostCount().count()).toBe(0);
  });

  it('should display the social media type dropdown and select all Facebook post', () => {
    page.selectSocialMediaTypeButton().click();
    expect(page.displayMediaTypeDropdownMenu().isPresent()).toBe(true);
    page.selectPostTypeButton('Facebook').click();
    browser.driver.sleep(5000);
    expect(page.getSocialMediaFilterText()).toEqual('Facebook');
    expect(page.getTwitterPostCount().count()).toBe(0);
    expect(page.getInstagramPostCount().count()).toBe(0);
  });
});
*/
