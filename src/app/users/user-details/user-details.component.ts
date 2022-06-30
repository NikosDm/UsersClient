import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userID: number;
  enableDeleteButton: boolean = false;
  enableSaveButton: boolean = true;
  fullName: string;
  userDetailsForm: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private auth: AuthService,
    private service: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.router.params.subscribe((data) => {
      this.userID = Number(data.id);
      if (this.userID === 0) {
        this.enableDeleteButton = false;
        this.userDetailsForm = this.fb.group({
          FirstName: ['', Validators.required],
          LastName: ['', Validators.required],
          Email: ['', Validators.required],
          RoleID: [0, Validators.required],
        });
      } else {
        this.enableDeleteButton = true;
        const user = this.service.getUser(this.userID);
        this.fullName = user.FirstName + ' ' + user.LastName;
        this.userDetailsForm = this.fb.group({
          FirstName: [user.FirstName, Validators.required],
          LastName: [user.LastName, Validators.required],
          Email: [user.Email, Validators.required],
          RoleID: [user.RoleID, Validators.required],
        });
      }
    });
  }

  save() {
    const user: User = { UserID: this.userID, ...this.userDetailsForm.value };
    const result = this.service.saveUser(user);
    // if (result) this.toastr.success('User details saved successfully');
    // else this.toastr.error('Something wrong happened.');
  }

  delete() {
    const result = this.service.deleteUser(this.userID);
    // if (result) {
    //   this.enableSaveButton = false;
    //   this.toastr.success('User deleted successfully');
    // } else this.toastr.error('Something wrong happened.');
  }
}
