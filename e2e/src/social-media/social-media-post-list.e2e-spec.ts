import { SocialMediaPostListPage } from './social-media-post-list.po';
import { async } from '@angular/core/testing';
import { browser, element, by } from 'protractor';

describe('Social Media Post List Page', () => {
  let page: SocialMediaPostListPage;

  beforeAll(() => {
    page = new SocialMediaPostListPage();
    page.navigateTo();
    browser.driver.sleep(10000);
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

  it('should select Facebook from the social media type select dropdown', () => {
    expect(page.selectSocialMediaType('')).toBeTruthy();
  });
});
