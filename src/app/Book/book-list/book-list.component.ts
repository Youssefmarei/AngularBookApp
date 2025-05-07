import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { type Book } from '../book.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../User/Auth/auth/auth.service';

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

  ngOnInit() {
    this.loadBooks();
    this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  public loadBooks() {
    this.booksService.getBooks().subscribe((books) => {
      this.books = this.showPremiumOnly
        ? books.filter((book) => book.isPremium === true)
        : books;
    });
  }

  toggleAvailable() {
    this.showPremiumOnly = !this.showPremiumOnly;
    this.loadBooks();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  onAddBook() {
    alert('Book Added!');
    this.toggleAddForm();
    this.booksService.addBook(this.addBookForm.value).subscribe(() => {
      this.loadBooks();
    });
  }
}
