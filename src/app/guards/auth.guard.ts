import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.accountService.loggedUser().pipe(
      map((user) => {
        if (user) return true;

        this.router.navigateByUrl('');
      })
    );
  }
}
