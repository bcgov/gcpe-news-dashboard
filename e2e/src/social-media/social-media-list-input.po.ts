import { browser, element, by } from 'protractor';

export class SocialMediaListInputPage {
    navigateTo() {
        return browser.get('/social-media-list-input');
    }

    getUrl() {
        return browser.getCurrentUrl();
    }

    getPageTitleText() {
        return element(by.css('app-social-media-list-input .navbar-brand h4')).getText();
    }

}
