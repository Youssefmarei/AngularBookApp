import { Routes } from '@angular/router';
import { UserComponent } from './User/user/user.component';
import { AuthComponent } from './User/Auth/auth/auth.component';
import { AuthGuard } from './User/Auth/auth/auth.gaurd';

/**
 * The main routing configuration for the application.
 * It defines the routes and their corresponding components.
 */
export const appRoutes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'profile', canActivate: [AuthGuard], component: UserComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'books',
    loadChildren: () => import('./Book/book.module').then((m) => m.BookModule),
  },
];
