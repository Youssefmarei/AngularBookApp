import { Component } from '@angular/core';
import { AuthService } from '../Auth/auth/auth.service';

/**
 * A component that displays user information and authentication status.
 */
@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  isLoggedIn: boolean = false;
  userEmail!: string;
  constructor(private authService: AuthService) {}

  /**
   * Initializes the component and subscribes to the authentication status.
   */
  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.userEmail = user!.email;
    });
  }
}
