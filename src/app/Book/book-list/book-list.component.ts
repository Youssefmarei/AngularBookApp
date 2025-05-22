import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { type Book } from '../book.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../User/Auth/auth/auth.service';

/**
 * A component that displays a list of books.
 */
@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  books!: Book[];
  showPremiumOnly: boolean = false;
  showAddForm: Boolean = false;
  addBookForm!: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    public booksService: BookService,
    private authService: AuthService
  ) {}

  /**
   * Initializes the form for adding a new book.
   */
  initializeForm() {
    this.addBookForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      genre: new FormControl(null, Validators.required),
      pageCount: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),
      isPremium: new FormControl(false),
    });
    this.toggleAddForm();
  }

  /**
   * Initializes the component and loads the books.
   */
  ngOnInit() {
    this.loadBooks();
    this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  /**
   * Loads the books from the service and filters them based on the premium status.
   */
  public loadBooks() {
    this.booksService.getBooks().subscribe((books) => {
      this.books = this.showPremiumOnly
        ? books.filter((book) => book.isPremium === true)
        : books;
    });
  }

  /**
   *toggles the premium filter for the book list.
   */
  togglePremium() {
    this.showPremiumOnly = !this.showPremiumOnly;
    this.loadBooks();
  }

  /**
   * toggles the visibility of the add book form.
   */
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  /**
   * Handles the addition of a book.
   * Calling the addBook method from the book service and reloading the book list.
   */
  onAddBook() {
    alert('Book Added!');
    this.toggleAddForm();
    this.booksService.addBook(this.addBookForm.value).subscribe(() => {
      this.loadBooks();
    });
  }
}
