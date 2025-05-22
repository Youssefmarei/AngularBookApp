import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { type Book } from './book.model';
import { AuthService } from '../User/Auth/auth/auth.service';

/**
 * A service that is responsible for managing book-related operations.
 * It provides methods to fetch, add, update, and delete books.
 */
@Injectable({ providedIn: 'root' })
export class BookService {
  private baseUrl = 'https://anuglar-f22b9-default-rtdb.firebaseio.com/books';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Fetches all books from the server.
   * @returns An observable containing an array of books.
   */
  getBooks(): Observable<Book[]> {
    return this.http.get<{ [key: string]: Book }>(this.baseUrl + '.json').pipe(
      map((responseData: { [key: string]: Book }) => {
        const books: Book[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            books.push({ ...responseData[key], id: key });
          }
        }
        return books;
      })
    );
  }

  /**
   * Adds a new book to the server.
   * @param {Book} book  The book to be added.
   * @returns An observable containing the response from the server.
   */
  addBook(book: Book): Observable<any> {
    return this.http.post(`${this.baseUrl}.json`, book);
  }

  /**
   * Deletes a book from the server.
   * @param {string} firebaseId  The ID of the book to be deleted.
   * @returns An observable containing the response from the server.
   */
  deleteBook(firebaseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${firebaseId}.json`);
  }

  /**
   * Updates an existing book on the server.
   * @param {string} firebaseId  The ID of the book to be updated.
   * @param {Book} book  The updated book data.
   * @returns An observable containing the response from the server.
   */
  updateBook(firebaseId: string, book: Book): Observable<any> {
    return this.http.put(`${this.baseUrl}/${firebaseId}.json`, book);
  }

  /**
   * Fetches the details of a specific book from the server.
   * @param {string} firebaseId  The ID of the book to be fetched.
   * @returns An observable containing the book details.
   */
  getBookDetails(firebaseId: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${firebaseId}.json`);
  }
}
