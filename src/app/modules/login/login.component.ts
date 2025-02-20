import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AuthService } from '~core/services';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzAlertModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // username = '';
  // password = '';
  haveErrorMessage = false;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username, password).subscribe({
      next: (res: boolean) => {
        console.log('Login successful', res);
        if (res) {
          this.authService.nextLogin(res);
        } else {
          this.haveErrorMessage = true;
          this.loginForm.controls['password'].reset();
          this.loginForm.controls['password'].markAsDirty();
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.haveErrorMessage = true;
        this.loginForm.controls['password'].reset();
      },
      complete: () => console.info('complete')
    })
  }

}
