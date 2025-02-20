import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Observable, Observer, Subject, takeUntil } from 'rxjs';
import { AuthService } from '~core/services';

@Component({
  selector: 'app-singup',
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
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingupComponent implements OnInit, OnDestroy {

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
    });

    // userName: this.fb.control('', [Validators.required], [this.userNameAsyncValidator]),
    // confirm: this.fb.control('', [this.confirmValidator]),
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
      setTimeout(() => {
        if (control.value === 'NyoByte') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
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
