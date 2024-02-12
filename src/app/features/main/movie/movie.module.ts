import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { RouterModule } from '@angular/router';
import { LoginGuardGuard } from 'src/app/core/guards/login-guard.guard';

@NgModule({
  declarations: [MovieComponent],
  imports: [CommonModule, RouterModule],
  providers: [LoginGuardGuard],
})
export class MovieModule {}
