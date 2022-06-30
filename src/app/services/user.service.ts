import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersURL: string = environment.users;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    if (localStorage.getItem('users'))
      return of(JSON.parse(localStorage.getItem('users')));

    return this.http.get(this.usersURL);
  }

  getUser(userID: number): User {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    return users.find((x) => x.UserID === userID);
  }

  saveUser(user: User) {
    let users: User[] = [];
    let newUsers: User[] = [];
    if (localStorage.getItem('users'))
      users = JSON.parse(localStorage.getItem('users'));
    else return -1;

    try {
      if (user.UserID === 0) {
        const maxID = Math.max.apply(
          Math,
          users.map(function (user) {
            return user.UserID;
          })
        );
        user.UserID = maxID + 1;
        newUsers.push(...users, user);
      } else {
        const index = users.findIndex((x) => x.UserID === user.UserID);
        users[index] = user;
        newUsers.push(...users);
      }

      localStorage.removeItem('users');
      localStorage.setItem('users', JSON.stringify(newUsers));
      return user.UserID;
    } catch {
      return user.UserID;
    }
  }

  deleteUser(userID: number) {
    let users: User[] = [];
    if (localStorage.getItem('users'))
      users = JSON.parse(localStorage.getItem('users'));
    else return of(false);

    try {
      const index = users.findIndex((x) => x.UserID === userID);
      users.splice(index, 1);

      localStorage.removeItem('users');
      localStorage.setItem('users', JSON.stringify(users));

      return of(true);
    } catch {
      return of(false);
    }
  }
}
