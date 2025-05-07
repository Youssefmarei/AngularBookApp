import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { BookService } from '../book.service';
import { AuthService } from '../../User/Auth/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let mockBookService: jasmine.SpyObj<BookService>;

  const mockBooks = [
    {
      title: 'Book 1',
      author: 'Author 1',
      genre: 'Genre 1',
      pageCount: 200,
      isPremium: false,
    },
    {
      title: 'Book 2',
      author: 'Author 2',
      genre: 'Genre 2',
      pageCount: 150,
      isPremium: true,
    },
  ];

  const mockUser = {
    email: 'test@example.com',
    id: '123',
    token: 'abc',
    tokenExpirationDate: new Date(),
  };

  const mockAuthService = {
    user: of(mockUser),
  };

  beforeEach(() => {
    mockBookService = jasmine.createSpyObj('BookService', [
      'getBooks',
      'addBook',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [BookListComponent],
      providers: [
        { provide: BookService, useValue: mockBookService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    mockBookService.getBooks.and.returnValue(of(mockBooks));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load books on ngOnInit (async)', fakeAsync(() => {
    component.ngOnInit();
    tick(); // Simulate passage of async time
    expect(mockBookService.getBooks).toHaveBeenCalled();
    expect(component.books.length).toBe(2);
  }));

  it('should set isLoggedIn to true when user is present (async)', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.isLoggedIn).toBeTrue();
  }));

  it('should filter books when showPremiumOnly is true (async)', fakeAsync(() => {
    component.showPremiumOnly = true;
    component.loadBooks();
    tick();
    expect(component.books.length).toBe(1);
    expect(component.books[0].isPremium).toBeTrue();
  }));

  it('should toggle showAddForm when toggleAddForm is called', () => {
    component.showAddForm = false;
    component.toggleAddForm();
    expect(component.showAddForm).toBeTrue();
  });
});
