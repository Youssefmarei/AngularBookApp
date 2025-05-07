import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { type Book } from './book.model';
import { AuthService } from '../User/Auth/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class BookService {
  private baseUrl = 'https://anuglar-f22b9-default-rtdb.firebaseio.com/books';

  constructor(private http: HttpClient, private authService: AuthService) {}

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

  addBook(book: Book): Observable<any> {
    return this.http.post(`${this.baseUrl}.json`, book);
  }

  deleteBook(firebaseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${firebaseId}.json`);
  }

  updateBook(firebaseId: string, book: Book): Observable<any> {
    return this.http.put(`${this.baseUrl}/${firebaseId}.json`, book);
  }

  getBookDetails(firebaseId: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${firebaseId}.json`);
  }
}
