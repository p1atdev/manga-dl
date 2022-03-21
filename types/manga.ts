export interface Episode {
  readableProduct: ReadableProduct;
}

export interface ReadableProduct {
  finishReadingNotificationUri: null;
  hasPurchased: boolean;
  id: string;
  imageUrisDigest: string;
  isPublic: boolean;
  nextReadableProductUri: string;
  number: number;
  pageStructure: PageStructure;
  permalink: string;
  prevReadableProductUri: null;
  publishedAt: Date;
  series: Series;
  title: string;
  toc: null;
  typeName: string;
}

export interface PageStructure {
  choJuGiga: string;
  pages: Page[];
  readingDirection: string;
  startPosition: string;
}

export interface Page {
  type: Type;
  contentStart?: string;
  height?: number;
  src?: string;
  width?: number;
  contentEnd?: string;
  tweetIds?: string[];
}

export enum Type {
  BackMatter = "backMatter",
  Link = "link",
  Main = "main",
  Other = "other",
}

export interface Series {
  id: string;
  thumbnailUri: string;
  title: string;
}
