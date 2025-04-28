import { Injectable } from '@angular/core';
import { Book } from './book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  getBookDetails(bookID: number) {
    return this.books.find((book) => bookID === book.id);
  }

  getAvailableBooks() {
    return this.books.filter((book) => book.availability === true);
  }

  getBooks() {
    return this.books;
  }

  private books: Book[] = [
    {
      id: 1,
      title: 'Journey to the Unknown',
      author: 'Robert Brown',
      genre: 'Mystery',
      pageCount: 494,
      availability: true,
    },
    {
      id: 2,
      title: 'The Great Adventure',
      author: 'John Smith',
      genre: 'Adventure',
      pageCount: 130,
      availability: false,
    },
    {
      id: 3,
      title: 'Beauty and The Beast',
      author: 'Michael Wilson',
      genre: 'Romance',
      pageCount: 836,
      availability: true,
    },
    {
      id: 4,
      title: 'Enchanted Forest',
      author: 'Robert Brown',
      genre: 'Romance',
      pageCount: 958,
      availability: false,
    },
    {
      id: 5,
      title: 'The Lord of The Rings',
      author: 'Jane Doe',
      genre: 'Fantasy',
      pageCount: 700,
      availability: true,
    },
    {
      id: 6,
      title: 'Secrets of the Jungle',
      author: 'John Smith',
      genre: 'Mystery',
      pageCount: 525,
      availability: false,
    },
  ];
}
