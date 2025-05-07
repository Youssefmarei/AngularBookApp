import { Component } from '@angular/core';
import { AuthService } from '../Auth/auth/auth.service';

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

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.userEmail = user!.email;
    });
  }
}
