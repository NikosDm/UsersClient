import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersURL: string = environment.users;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(this.usersURL);
  }
}
