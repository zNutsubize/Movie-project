import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { MovieComponent } from './features/main/movie/movie.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { LoginGuardGuard } from './core/guards/login-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MovieComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [LoginGuardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
