/**
 * This class represents a user in the application.
 */
export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  /**
   * A getter method that returns the token of the user.
   * returns null if the token is expired or not set.
   * @returns The token of the user.
   */
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  /**
   * A setter method that sets the token of the user.
   * It is used to update the token when the user logs in or signs up.
   * @param token The token to set.
   */
  set token(token: string | null) {
    this._token = token!;
  }
}
