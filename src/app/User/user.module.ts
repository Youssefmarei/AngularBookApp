import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { AuthComponent } from './Auth/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * A module that encapsulates all user-related components and services.
 */
@NgModule({
  declarations: [UserComponent, AuthComponent],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  exports: [UserComponent, AuthComponent],
})
export class UserModule {}
