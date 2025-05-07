import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { skip } from 'rxjs-compat/operator/skip';

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
    private bookService: BookService
  ) {}

  bookId!: string;
  book!: Book;
  editedBook!: Book;
  showEditForm: boolean = false;

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.loadBook();
  }

  loadBook() {
    this.bookService.getBookDetails(this.bookId).subscribe((book) => {
      if (book) {
        this.book = book;
        this.editedBook = structuredClone(book);
      }
    });
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
    if (!this.showEditForm) {
      this.editedBook = structuredClone(this.book);
    }
  }

  ngOnSubmit() {
    this.bookService.updateBook(this.bookId, this.editedBook).subscribe(() => {
      alert('Book updated!');
      this.showEditForm = false;
      this.loadBook();
    });
  }

  onCancel() {
    this.toggleEditForm();
  }

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
