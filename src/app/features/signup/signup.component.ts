import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { User } from 'src/app/shared/interface/user-interface';
import { ApiService } from 'src/app/shared/service/api.service';
import { LoginAuthService } from 'src/app/shared/service/login-auth.service';
import { NavService } from 'src/app/shared/service/nav.service';
import {
  RxReactiveFormsModule,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup;
  public userObj: User = {
    email: '',
    password: '',
    id: 0,
  };

  constructor(
    private router: Router,
    private api: ApiService,
    private nav: NavService,
    private login: LoginAuthService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.nav.navAppear$.next(true);
      this.login.isLogged = true;
      this.router.navigate(['/main']);
    }

    this.formGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        RxwebValidators.endsWith({ value: 'sweeft.com' }),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  LogIn() {
    this.router.navigate(['/login']);
  }
  SignUp(): void {
    let email = this.formGroup.value.email;
    console.log(this.formGroup);
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
              return a.email === email.toLowerCase();
            });
            if (!user) {
              this.userObj.email = email.toLowerCase();
              this.userObj.password = this.formGroup.value.password;
              this.api.postUsers(this.userObj).subscribe((res) => {
                this.formGroup.reset();
                alert('You have successfully registered!');
                this.router.navigate(['login']);
              });
            } else {
              alert('User with this email address already exists!');
            }
          }
        });
    } else {
      alert('Invalid User or Password');
    }
  }
}
