export class Theme {
    summary: string;
    ministryKeys: string[];
    assetUrl: string;
    publishDate: string;
    documents: Document[];
    type: string;
}

export class Document {
    headline: string;
    subheadline: string;
    detailsHtml: string;
  }
  