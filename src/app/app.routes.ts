import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './User/user/user.component';

export const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'users', component: UserComponent },
  {
    path: 'books',
    loadChildren: () => import('./Book/book.module').then((m) => m.BookModule),
  },
];
