/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise<boolean>((resolve) => {
      this.auth.check().subscribe(
        (response) => {
          resolve(true);
        },
        (err: any) => {
          console.log(err);
          this.router.navigate(['']).then(() => {
            resolve(false);
          });
        }
      );
    });
  }
}
