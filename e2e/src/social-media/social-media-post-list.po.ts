import { browser, element, by } from 'protractor';

export class SocialMediaPostListPage {
    navigateTo() {
        return browser.get('/social-media-list?type=All');
    }

    getUrl() {
        return browser.getCurrentUrl();
    }

    getHeadingText() {
        return element(by.css('app-hq-dashboard-sub-menu .dashboard-sub-menu-container h2')).getText();
    }

    getSelectedSubNavItem() {
        return element(by.css('app-hq-dashboard-sub-menu .dashboard-sub-menu-container li.list-inline-item .active')).getText();
    }
}
