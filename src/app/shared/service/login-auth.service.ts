import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthService {
  isLogged: boolean = false;

  constructor() {}

  isLoggedIn(): boolean {
    return this.isLogged;
  }
}
