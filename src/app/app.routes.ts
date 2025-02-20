import { Routes } from '@angular/router';
import { AuthGuard } from '~core/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './modules/login/login.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { SingupComponent } from './modules/singup/singup.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'welcome',
        data: { role: 'admin' },
        component: WelcomeComponent
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'singup', component: SingupComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  }
];