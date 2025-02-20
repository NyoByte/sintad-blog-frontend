import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'];
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate(['auth/login']);
      return false;
    }

    if (requiredRole) {
      console.log('requiredRole', requiredRole)
      // const hasRole = this.authService.hasRole(requiredRole);
      // if (!hasRole) {
      //   this.router.navigate(['/forbidden']);
      //   return false;
      // }
    }

    return true;
  }

}