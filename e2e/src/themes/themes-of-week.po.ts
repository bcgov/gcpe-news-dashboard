import { browser, element, by } from 'protractor';

export class ThemesOfWeekPage {
    navigateTo() {
        return browser.get('/themes-of-the-week');
    }
    /* comment out integration test and waiting for solutions
    getUrl() {
        return browser.getCurrentUrl();
    }
    getHeadingText() {
        return element(by.css('app-hq-dashboard-sub-menu .dashboard-sub-menu-container h2')).getText();
    }

    getSelectedSubNavItem() {
        return element(by.css('app-hq-dashboard-sub-menu .dashboard-sub-menu-container li.list-inline-item .active')).getText();
    }

    getThemeList() {
        return element(by.css('#theme-list-container #theme-list'));
    }
    */
}
