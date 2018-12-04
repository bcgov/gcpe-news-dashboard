import { of } from 'rxjs';
import { Theme } from '../shared/theme';

export function FakeThemeData(publishedCount: number, unpublishedCount: number, includeHighlighted: boolean) {
    let themes: Theme[] = [];

    for (var i = 0; i < publishedCount; i++) {
        var theme = new Theme(`Test theme title - ${i}`, `Test theme description - ${i}`, i, false, true, new Date());
        themes.push(theme);
    }
    for (var i = 0; i < unpublishedCount; i++) {
        var index = i + unpublishedCount;
        var theme = new Theme(`Test theme title - ${index}`, `Test theme description - ${index}`, index, false, false, new Date())
        themes.push(theme);
    }
    if (includeHighlighted) {
        var theme = new Theme(`Highlighted message title`, `Highlighted message description`, 0, true, true, new Date())
        themes.push(theme);
    }

    return themes;
}