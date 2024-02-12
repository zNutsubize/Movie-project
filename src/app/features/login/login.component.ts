import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/service/api.service';
import { LoginAuthService } from 'src/app/shared/service/login-auth.service';
import { NavService } from 'src/app/shared/service/nav.service';
import { User } from 'src/app/shared/interface/user-interface';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private login: LoginAuthService,
    private nav: NavService,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.nav.navAppear$.next(true);
      this.login.isLogged = true;
      this.router.navigate(['/main']);
    }
    console.log(this.login.isLoggedIn());
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  LogIn() {
    if (this.formGroup.valid) {
      this.api
        .getUsers()
        .pipe(
          catchError((err) => {
            if (err) {
              console.error(err);
              return of(false);
            }
            return of(true);
          })
        )
        .subscribe((res: any) => {
          if (res) {
            const user = res.find((a: User) => {
              let email = this.formGroup.value.email;
              return (
                a.email === email.toLowerCase() &&
                a.password === this.formGroup.value.password
              );
            });
            if (user) {
              alert('Login Successful!');
              this.api.user = user;
              this.formGroup.reset();
              this.nav.navAppear$.next(true);
              this.login.isLogged = true;
              console.log(this.login.isLoggedIn());
              localStorage.setItem('user', user);
              this.router.navigate(['/main']);
            } else {
              alert('user not found!');
            }
          }
        });
    } else if (this.formGroup.value.email.invalid) {
      alert('eMail must contain @sweeft.com');
    } else {
      alert('Password must be at least 6 characters');
    }
  }
  SignUp() {
    this.router.navigate(['/signup']);
  }
}
