import { Component, EventEmitter, Output } from '@angular/core';
import { BookService } from '../book.service';
import { type Book } from '../book.model';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  books!: Book[];
  showAvailableOnly: boolean = false;

  constructor(public booksService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  public loadBooks() {
    if (this.showAvailableOnly) {
      this.books = this.booksService.getAvailableBooks();
    } else {
      this.books = this.booksService.getBooks();
    }
  }

  toggleAvailable() {
    this.showAvailableOnly = !this.showAvailableOnly;
    this.loadBooks();
  }
}
