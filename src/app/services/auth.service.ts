import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginDTO, User, UserToken } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersURL: string = environment.users;
  private usersTokensURL: string = environment.usersTokens;

  constructor(private http: HttpClient) {}

  login(user: LoginDTO): Observable<any> {
    return combineLatest(
      this.http.get(this.usersURL),
      this.http.get(this.usersTokensURL)
    ).pipe(
      map((responses: any) => {
        try {
          const users: User[] = responses[0];

          //Set users to local storage so that RUD operations can perform
          localStorage.setItem('users', JSON.stringify(users));

          const userTokens: UserToken[] = responses[1];
          const loggedInUser: User = users.find(
            (x) => x.Email === user.Email && x.Password === user.Password
          );
          const userToken: UserToken = userTokens.find(
            (x) => x.UserID === loggedInUser.UserID
          );

          if (loggedInUser && userToken) {
            const tokenDetails = this.getDecodedToken(userToken.Token);

            if (
              tokenDetails.email === loggedInUser.Email &&
              tokenDetails.roleId === loggedInUser.RoleID &&
              tokenDetails.password === loggedInUser.Password
            ) {
              this.setCurrentUser(loggedInUser, userToken);
              return true;
            }
          }

          return false;
        } catch {
          return false;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
  }

  loggedUser() {
    const user = localStorage.getItem('user');
    return of(JSON.parse(user));
  }

  isLoggedIn() {
    return localStorage.getItem('user');
  }

  private setCurrentUser(user: User, userToken: UserToken) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...userToken,
        FirstName: user.FirstName,
        LastName: user.LastName,
        RoleID: user.RoleID,
      })
    );
  }

  private getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
