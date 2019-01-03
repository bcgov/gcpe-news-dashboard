import { Message } from '../view-models/message';

export function FakeThemeData(publishedCount: number, unpublishedCount: number, includeHighlighted: boolean) {
  let themes: Message[] = [];

    for (var i = 0; i < publishedCount; i++) {
        var theme = { id: i.toString(), title: `Test theme title - ${i}`, description: `Test theme description - ${i}`, sortOrder: i, isPublished: true, timestamp: new Date() } as Message;
        themes.push(theme);
    }
    for (var i = 0; i < unpublishedCount; i++) {
        var index = i + unpublishedCount;
        var theme = { id: i.toString(), title: `Test theme title - ${index}`, description: `Test theme description - ${index}`, sortOrder: index, isPublished: false, timestamp: new Date() } as Message;
        themes.push(theme);
    }
    if (includeHighlighted) {
       var theme = { id: i.toString(), title: `Highlighted message title`, description: `Highlighted message description`, sortOrder: 0, isPublished: true, isHighlighted: true, timestamp: new Date() } as Message;
        themes.push(theme);
    }

    return themes;
}
