import { Message } from '../view-models/message';

export function FakeThemeData(publishedCount: number, unpublishedCount: number, includeHighlighted: boolean) {
  const themes: Message[] = [];

    // tslint:disable-next-line:no-shadowed-variable
    // tslint:disable-next-line:no-var-keyword
    for (var i = 0; i < publishedCount; i++) {
        // tslint:disable-next-line:no-shadowed-variable
        const theme = {
            id: i.toString(),
            title: `Test theme title - ${i}`,
             description: `Test theme description - ${i}`,
            sortOrder: i,
            isPublished: true,
            timestamp: new Date() } as Message;
        themes.push(theme);
    }
    // tslint:disable-next-line:no-var-keyword
    for (var i = 0; i < unpublishedCount; i++) {
        const index = i + unpublishedCount;
        // tslint:disable-next-line:no-shadowed-variable
        const theme = {
            id: i.toString(),
            title: `Test theme title - ${index}`,
            description: `Test theme description - ${index}`,
            sortOrder: index, isPublished: false,
            timestamp: new Date() } as Message;
        themes.push(theme);
    }
    if (includeHighlighted) {
       const theme = {
           id: i.toString(),
           title: `Highlighted message title`,
           description: `Highlighted message description`,
           sortOrder: 0,
           isPublished: true,
           isHighlighted: true,
           timestamp: new Date() } as Message;
        themes.push(theme);
    }

    return themes;
}
