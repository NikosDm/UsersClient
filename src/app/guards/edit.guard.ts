import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EditGuard implements CanActivate {
  userID: number;

  constructor(
    private accountService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.userID = Number(route.params.id);
    return this.accountService.loggedUser().pipe(
      map((user) => {
        if (user.RoleID === Role.Manager)
          this.notificationService.show({
            content: 'You do not have permission to add or edit a user',
            cssClass: 'button-notification',
            animation: { type: 'slide', duration: 100 },
            position: { horizontal: 'center', vertical: 'bottom' },
            type: { style: 'warning', icon: true },
            hideAfter: 3000,
          });

        if (user.RoleID === Role.Editor && this.userID === 0)
          this.notificationService.show({
            content: 'You do not have permission to add a new user',
            cssClass: 'button-notification',
            animation: { type: 'slide', duration: 100 },
            position: { horizontal: 'center', vertical: 'bottom' },
            type: { style: 'warning', icon: true },
            hideAfter: 3000,
          });

        if (
          user.RoleID === Role.Admin ||
          (user.RoleID === Role.Editor && this.userID !== 0)
        )
          return true;

        this.router.navigateByUrl('/users');
      })
    );
  }
}
