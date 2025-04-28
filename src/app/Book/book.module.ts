import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookRoutingModule } from './book-routing.module';
@NgModule({
  declarations: [BookListComponent, BookDetailComponent],
  imports: [CommonModule, BookRoutingModule],
  exports: [BookListComponent, BookDetailComponent],
})
export class BookModule {}
