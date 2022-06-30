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
import { Role } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EditGuard implements CanActivate {
  constructor(private accountService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.accountService.loggedUser().pipe(
      map((user) => {
        if (user.RoleID === Role.Admin || user.RoleID === Role.Editor)
          return true;

        this.router.navigateByUrl('/users');
      })
    );
  }
}
