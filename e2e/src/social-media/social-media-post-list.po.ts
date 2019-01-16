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

    selectSocialMediaTypeButton() {
        return element(by.id('dropdown-social-media-filter'));
    }

    displayMediaTypeDropdownMenu() {
        return element(by.css('#social-media-filter-dropdown-menu.show'));
    }

    selectPostTypeButton(type: string) {
        return element(by.cssContainingText('button.dropdown-item', type));
    }

    getSocialMediaFilterText() {
        return element(by.css('#dropdown-social-media-filter.btn-link')).getText();
    }

    getSocialMediaPostCount() {
        return element.all(by.css('.social-media-post'));
    }

    getFacebookPostCount() {
        return element.all(by.css('.social-media-post .facebook-wrapper'));
    }

    getTwitterPostCount() {
        return element.all(by.css('.social-media-post .twitter-wrapper'));
    }

    getInstagramPostCount() {
        return element.all(by.css('.social-media-post .instagram-wrapper'));
    }
}
