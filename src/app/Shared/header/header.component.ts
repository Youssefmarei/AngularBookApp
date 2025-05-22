import { Component } from '@angular/core';
import { AuthService } from '../../User/Auth/auth/auth.service';

/**
 * A component that displays the header of the application
 */
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isloggedIn: boolean = false;
  constructor(private authService: AuthService) {}

  /**
   * Initializes the component and subscribes to the authentication status.
   */
  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isloggedIn = !!user;
    });
  }

  /**
   * Logs out the user by calling the AuthService's logOut method.
   * This method is called when the user clicks the logout button in the header.
   */
  logOut() {
    this.authService.logOut();
  }
}
