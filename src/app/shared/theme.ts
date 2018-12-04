export class Theme {
    constructor(public title: string,
                public description: string,
                public sortOrder: number,
                public isHighlighted: boolean,
                public isPublished: boolean,
                public timestamp: Date) {
    }
}

export class Document {
    headline: string;
    subheadline: string;
    detailsHtml: string;
  }
  