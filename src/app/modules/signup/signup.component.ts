import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Observable, Observer, Subject, takeUntil } from 'rxjs';
import { AuthService } from '~core/services';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzAlertModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  validateForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required], [this.usernameAsyncValidator]],
      password: ['', Validators.required],
      confirm: ['', [Validators.required, this.confirmValidator]],
      fullname: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.validateForm.get('password')!.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.validateForm.get('confirm')!.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  usernameAsyncValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
    return new Observable((observer: Observer<ValidationErrors | null>) => {
      this.authService.confirmUsername(control.value).subscribe(data => {
        if (data) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      })
    });
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    const username = this.validateForm.get('username')?.value;
    const password = this.validateForm.get('password')?.value;
    const fullname = this.validateForm.get('fullname')?.value;
    this.authService.signup({ username, password, fullname }).subscribe(data => {
      this.router.navigate(['/auth/login']);
    });
  }

  confirmValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.get('password')?.value) {
      return { error: true, confirm: true };
    }
    return null;
  }

} 