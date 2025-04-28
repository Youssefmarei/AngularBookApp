import { Component, input, Input } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent {
  constructor(private route: ActivatedRoute, public bookService: BookService) {}
  book?: Book;

  ngOnInit() {
    const bookID = Number(this.route.snapshot.paramMap.get('id'));
    this.book = this.bookService.getBookDetails(bookID);
  }
}
