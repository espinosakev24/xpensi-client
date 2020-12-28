import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserLogin, IUserRegister } from 'src/app/interfaces/user';
import jwt from 'jwt-decode';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authEndPoint: string = 'http://localhost:4000/auth';
  private _logged$ = new Subject<void>();
  constructor(private http: HttpClient, private route: Router) {
  }
  get logged$ () {
    return this._logged$;
  }
  login(user: IUserLogin) {
    return this.http.post(this.authEndPoint + '/login', user);
  }
  register(user: IUserRegister) {
    return this.http.post(this.authEndPoint + '/register', user);
  }
  currentUser(){
    const token: string = localStorage.getItem('auth_token') || '';
    let decodedUser: any;

    if (token.length) {
      decodedUser = jwt(token);
    }
    if (decodedUser && decodedUser.user.id) {
      return decodedUser.user;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem('auth_token');
    window.location.href = "http://localhost:4200/authentication/login";
    // this.route.navigate(['authentication', 'login'])
  }
}
