import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Role, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userID: number;
  isUserAdmin: boolean;
  disableDeleteButton: boolean = false;
  disableSaveButton: boolean = false;
  fullName: string;
  userDetailsForm: FormGroup;

  constructor(
    private router: ActivatedRoute,
    public auth: AuthService,
    private service: UserService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  get EditorRole() {
    return Role.Editor;
  }

  ngOnInit() {
    this.router.params.subscribe((data) => {
      this.userID = Number(data.id);
      if (this.userID === 0) {
        this.disableDeleteButton = true;
        this.userDetailsForm = this.fb.group({
          FirstName: ['', Validators.required],
          LastName: ['', Validators.required],
          Email: ['', Validators.required],
          RoleID: [3, Validators.required],
        });
      } else {
        this.disableDeleteButton = false;
        const user = this.service.getUser(this.userID);
        this.fullName = user.FirstName + ' ' + user.LastName;
        this.isUserAdmin = user.RoleID === Role.Admin;
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
    if (result > 0) {
      this.updateValues(user, result);
      this.disableDeleteButton = false;
      this.notificationService.show({
        content: 'User details saved successfully',
        cssClass: 'button-notification',
        animation: { type: 'slide', duration: 100 },
        position: { horizontal: 'center', vertical: 'bottom' },
        type: { style: 'success', icon: true },
        hideAfter: 3000,
      });
    } else
      this.notificationService.show({
        content: 'Something wrong happened.',
        cssClass: 'button-notification',
        animation: { type: 'slide', duration: 100 },
        position: { horizontal: 'center', vertical: 'bottom' },
        type: { style: 'error', icon: true },
        hideAfter: 3000,
      });
  }

  delete() {
    const result = this.service.deleteUser(this.userID);
    if (result) {
      this.disableSaveButton = true;
      this.disableDeleteButton = true;
      this.notificationService.show({
        content: 'User deleted successfully',
        cssClass: 'button-notification',
        animation: { type: 'slide', duration: 100 },
        position: { horizontal: 'center', vertical: 'bottom' },
        type: { style: 'success', icon: true },
        closable: false,
      });
    } else
      this.notificationService.show({
        content: 'Something wrong happened.',
        cssClass: 'button-notification',
        animation: { type: 'slide', duration: 100 },
        position: { horizontal: 'center', vertical: 'bottom' },
        type: { style: 'error', icon: true },
        closable: false,
      });
  }

  private updateValues(user: User, userID: number) {
    this.userID = userID;
    this.fullName = `${user.FirstName} ${user.LastName}`;
    this.userDetailsForm = this.fb.group({
      FirstName: [user.FirstName, Validators.required],
      LastName: [user.LastName, Validators.required],
      Email: [user.Email, Validators.required],
      RoleID: [user.RoleID, Validators.required],
    });
  }
}
