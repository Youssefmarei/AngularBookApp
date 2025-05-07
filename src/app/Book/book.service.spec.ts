import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from './book.model';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  const mockBook: Book = {
    title: 'Angular',
    author: 'John Doe',
    genre: 'A book about Angular',
    id: 'abc123',
    pageCount: 200,
    isPremium: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch books', () => {
    const mockResponse = {
      abc123: {
        title: 'Angular',
        author: 'John Doe',
        description: 'A book about Angular',
      },
    };

    service.getBooks().subscribe((books) => {
      expect(books.length).toBe(1);
      expect(books[0].id).toBe('abc123');
    });

    const req = httpMock.expectOne(
      'https://anuglar-f22b9-default-rtdb.firebaseio.com/books.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should add a book', () => {
    service.addBook(mockBook).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(
      'https://anuglar-f22b9-default-rtdb.firebaseio.com/books.json'
    );
    expect(req.request.method).toBe('POST');
    req.flush({ name: 'abc123' });
  });

  it('should delete a book', () => {
    service.deleteBook('abc123').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(
      'https://anuglar-f22b9-default-rtdb.firebaseio.com/books/abc123.json'
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a book', () => {
    service.updateBook('abc123', mockBook).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(
      'https://anuglar-f22b9-default-rtdb.firebaseio.com/books/abc123.json'
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockBook);
  });

  it('should get book details', () => {
    service.getBookDetails('abc123').subscribe((book) => {
      expect(book.title).toBe('Angular');
    });

    const req = httpMock.expectOne(
      'https://anuglar-f22b9-default-rtdb.firebaseio.com/books/abc123.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);
  });
});
