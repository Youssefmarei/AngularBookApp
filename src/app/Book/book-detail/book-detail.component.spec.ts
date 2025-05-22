// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BookDetailComponent } from './book-detail.component';
// import { of } from 'rxjs';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BookService } from '../book.service';
// import { Book } from '../book.model';
// import { SharedModule } from '../../Shared/shared.module';
// import { ShortenPipe } from '../../Shared/pipes/shorten.pipe';

// describe('BookDetailComponent', () => {
//   let component: BookDetailComponent;
//   let fixture: ComponentFixture<BookDetailComponent>;
//   let mockBookService: any;
//   let mockRouter: any;
//   let mockActivatedRoute: any;

//   const mockBook: Book = {
//     id: '1',
//     title: 'Test Book',
//     author: 'Test Author',
//     genre: 'Test Genre',
//     pageCount: 100,
//     isPremium: false,
//   };

//   beforeEach(async () => {
//     mockBookService = {
//       getBookDetails: jasmine.createSpy().and.returnValue(of(mockBook)),
//       updateBook: jasmine.createSpy().and.returnValue(of(null)),
//       deleteBook: jasmine.createSpy().and.returnValue(of(null)),
//     };

//     mockRouter = {
//       navigate: jasmine.createSpy(),
//       navigateByUrl: jasmine.createSpy().and.returnValue(Promise.resolve(true)),
//     };

//     mockActivatedRoute = {
//       snapshot: {
//         paramMap: {
//           get: () => '1',
//         },
//       },
//     };

//     await TestBed.configureTestingModule({
//       declarations: [BookDetailComponent, ShortenPipe],
//       providers: [
//         { provide: BookService, useValue: mockBookService },
//         { provide: Router, useValue: mockRouter },
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(BookDetailComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load book on init', () => {
//     expect(component.book).toEqual(mockBook);
//     expect(component.editedBook).toEqual(mockBook);
//     expect(mockBookService.getBookDetails).toHaveBeenCalledWith('1');
//   });

//   it('should toggle edit form and reset editedBook when closing', () => {
//     component.showEditForm = true;
//     component.editedBook.title = 'Changed Title';
//     component.toggleEditForm();
//     expect(component.showEditForm).toBeFalse();
//     expect(component.editedBook).toEqual(mockBook);
//   });

//   it('should call updateBook on submit', () => {
//     spyOn(window, 'alert');
//     component.ngOnSubmit();
//     expect(mockBookService.updateBook).toHaveBeenCalledWith('1', mockBook);
//     expect(window.alert).toHaveBeenCalledWith('Book updated!');
//   });

//   it('should call deleteBook and navigate on confirm', () => {
//     spyOn(window, 'confirm').and.returnValue(true);
//     spyOn(window, 'alert');
//     component.onDeleteBook();
//     expect(mockBookService.deleteBook).toHaveBeenCalledWith('1');
//     expect(window.alert).toHaveBeenCalledWith('Book deleted!');
//   });

//   it('should not delete book if confirm is cancelled', () => {
//     spyOn(window, 'confirm').and.returnValue(false);
//     component.onDeleteBook();
//     expect(mockBookService.deleteBook).not.toHaveBeenCalled();
//   });
// });
