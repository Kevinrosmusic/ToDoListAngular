import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
  uid: string;
  name: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private _user?: User;

  constructor(private http: HttpClient) {}

  login(form: FormGroup) {
    return this.http
      .post<User>(environment.api + '/users/login', form.value)
      .pipe(
        tap((response) => {
          localStorage.setItem('uid', response.uid);
          localStorage.setItem('name', response.name);
          localStorage.setItem('x-token', response.token);
        }),
        catchError((error) => {
          this.deauthenticate();
          return throwError(error);
        })
      );
  }

  private deauthenticate() {
    localStorage.clear();
  }

  register(form: FormGroup) {
    return this.http.post(environment.api + '/users/register', form.value);
  }

  check() {
    const token = localStorage.getItem('x-token') || '';

    if (!token) {
      localStorage.clear();
    }

    return this.http.get<User>(environment.api + '/users/renew', {
      headers: {
        'x-token': token,
      },
    });
  }
}
