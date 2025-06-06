/**
 * An interface defining Type book.
 */
export interface Book {
  id?: string;
  title: string;
  author: string;
  genre: string;
  pageCount: number;
  isPremium: boolean;
}
