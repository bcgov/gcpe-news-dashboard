import { browser, element, by } from 'protractor';

export class SocialMediaPostListPage {

    selectSocialMediaDropdownButton = element(by.id('dropdown-social-media-filter'));

    navigateTo() {
        return browser.get('/social-media-list?type=All');
    }

    getUrl() {
        return browser.getCurrentUrl();
    }

    getHeadingText() {
        return element(by.css('.container-fluid .dashboard-sub-menu-container h2')).getText();
    }

    getSelectedSubNavItem() {
        return element(by.css('app-hq-dashboard-sub-menu .dashboard-sub-menu-container li.list-inline-item .active')).getText();
    }

    displayMediaTypeDropdown() {
        return element(by.id('dropdown-social-media-filter')).isDisplayed();
    }

    selectSocialMediaType(type: string) {
        return element(by.css("#dropdown-social-media-filter [value='All']")).click();
    }
}
