import { Component } from '@angular/core';
import { AuthService } from '../../User/Auth/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isloggedIn: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isloggedIn = !!user;
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
