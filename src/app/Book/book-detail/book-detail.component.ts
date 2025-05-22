import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * A component that displays the details of a book and allows editing and deleting it.
 */
@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
  ) {}

  bookId!: string;
  book!: Book;
  editedBook!: Book;
  showEditForm: Boolean = false;

  /**
   * Initializes the component and loads the book details.
   */
  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.loadBook();
  }

  /**
   * Fetches the book details from the service.
   */
  loadBook() {
    this.bookService.getBookDetails(this.bookId).subscribe((book) => {
      if (book) {
        this.book = book;
        this.editedBook = structuredClone(book);
      }
    });
  }

  /**
   * Toggles the visibility of the edit form.
   * If the form is closed, it resets the edited book details.
   */
  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
    if (!this.showEditForm) {
      this.editedBook = structuredClone(this.book);
    }
  }

  /**
   * Submits the edited book details to the service.
   */
  ngOnSubmit() {
    this.bookService.updateBook(this.bookId, this.editedBook).subscribe(() => {
      alert('Book updated!');
      this.showEditForm = false;
      this.loadBook();
    });
  }

  /**
   * Cancels the edit operation.
   */
  onCancel() {
    this.toggleEditForm();
  }

  /**
   * Deletes the book after confirming with the user.
   */
  onDeleteBook() {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(this.bookId).subscribe(() => {
        alert('Book deleted!');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/books']);
          });
      });
    }
  }
}
