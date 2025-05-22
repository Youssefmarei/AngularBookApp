import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type AuthResponseData } from './auth.model';
import { User } from '../../user/user.model';
import { BehaviorSubject, catchError, retry, tap, throwError } from 'rxjs';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';

/**
 * A service that is responsible for managing user authentication.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Logs out the user by clearing the user data and navigating to the auth page.
   */
  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  /**
   * A method that handles user sign-up.
   * It sends a POST request to the Firebase Authentication API to create a new user.
   * @param email the user's email
   * @param password the user's password
   * @returns the observable of the HTTP response
   * @throws an error if the request fails
   */
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcg4EzDrWp3t8sELeX2pddaKIdkaQncWw',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  /**
   * A method that handles user login.
   * It sends a POST request to the Firebase Authentication API to log in the user.
   * @param email the user's email
   * @param password the user's password
   * @returns the observable of the HTTP response
   * @throws an error if the request fails
   */
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcg4EzDrWp3t8sELeX2pddaKIdkaQncWw',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  /**
   * A method that handles user authentication.
   * It stores the user data in local storage and updates the user BehaviorSubject.
   * @param email the user's email
   * @param userId the user's ID
   * @param token the user's token
   * @param expiresIn the expiration time of the token
   */
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  /**
   * A method that handles errors from the HTTP requests.
   * It maps the error response to a user-friendly error message.
   * @param {HttpErrorResponse} errorRes the error response from the HTTP request
   * @returns an observable of the error message
   */
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    console.log(errorRes);
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Make sure the email and password are correct';
        break;
    }
    return throwError(errorMessage);
  }
}
