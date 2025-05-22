import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { Router, RouterModule } from '@angular/router';

/**
 * A module that encapsulates all shared components and pipes.
 */
@NgModule({
  declarations: [HeaderComponent, ShortenPipe],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, ShortenPipe],
})
export class SharedModule {}
