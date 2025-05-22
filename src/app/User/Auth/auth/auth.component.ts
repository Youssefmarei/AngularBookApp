import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.model';
import { Router } from '@angular/router';

/**
 * A component that handles user authentication in both login and sign-up.
 */
@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error!: string;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Toggles the authentication mode between login and sign-up.
   */
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  /**
   * Submits the form data for authentication.
   * It handles both login and sign-up based on the current mode.
   * @param {NgForm} form The form data containing email and password.
   */
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
      this.isLoginMode = true;
    }

    authObs.subscribe(
      (resData) => {
        this.router.navigate(['/books']);
        this.isLoading = false;
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
