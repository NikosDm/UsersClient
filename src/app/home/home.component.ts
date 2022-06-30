import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  showError: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    if (this.auth.isLoggedIn()) this.router.navigateByUrl('users');
  }

  login() {
    this.showError = false;
    this.auth.login(this.loginForm.value).subscribe((result: boolean) => {
      if (result) this.router.navigateByUrl('/users');
      else this.showError = true;
    });
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
}
