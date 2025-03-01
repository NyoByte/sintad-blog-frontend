import { Routes } from '@angular/router';
import { AuthGuard } from '~core/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './modules/login/login.component';
import { ArticlesComponent } from './modules/articles/articles.component';
import { SignupComponent } from './modules/signup/signup.component';
import { ArticlesDetailsComponent } from './modules/articles/articles-details/articles-details.component';
import { PopularArticlesComponent } from './modules/popular-articles/popular-articles.component';
import { OwnArticlesComponent } from './modules/own-articles/own-articles.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'articles',
        data: { role: 'admin' },
        children: [
          {
            path: '',
            component: ArticlesComponent
          },
          {
            path: ':id',
            component: ArticlesDetailsComponent
          }
        ]
      },
      {
        path: 'popular',
        data: { role: 'admin' },
        component: PopularArticlesComponent
      },
      {
        path: 'my-articles',
        component: OwnArticlesComponent
      },
      { path: '', redirectTo: 'articles', pathMatch: 'full' },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  }
];