import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { process } from '@progress/kendo-data-query';
import { Role, User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  gridData: User[];
  gridView: unknown[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users) => {
      this.gridData = users;
      this.gridView = this.gridData;
    });
  }

  IsAdmin(roleID: number): boolean {
    return roleID === Role.Admin;
  }

  IsManager(roleID: number): boolean {
    return roleID === Role.Manager;
  }

  IsEditor(roleID: number): boolean {
    return roleID === Role.Editor;
  }

  onFilter(input: Event): void {
    const inputValue = (input.target as HTMLInputElement).value;

    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'FirstName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'LastName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'Email',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'Role',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;
  }

  AddNewUser() {
    this.router.navigateByUrl('users/0');
  }

  onEdit(UserID: number) {
    this.router.navigateByUrl(`users/${UserID}`);
  }
}
