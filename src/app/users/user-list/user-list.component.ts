import { Component, OnInit } from '@angular/core';
import { process } from '@progress/kendo-data-query';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  public gridData: unknown[] = [
    {
      UserID: 1,
      FirstName: 'Nikos',
      LastName: 'Thoma',
      Password: 'dasd',
      Email: 'asdad@dasd.com',
      RoleID: 1,
    },
  ];
  public gridView: unknown[];

  constructor() {}

  ngOnInit() {
    this.gridView = this.gridData;
  }

  public onFilter(input: Event): void {
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
}
