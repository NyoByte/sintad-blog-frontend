import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { ApiResponseModel, UserModel } from '~models/index';

const API_URL = `${environment.HOST_BACKEND_API}/users`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    this.router.navigate(['auth/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  nextLogin(token: string): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('authToken', token);
    this.router.navigate(['articles']);
  }

  login(username: string, password: string): Observable<ApiResponseModel<string>> {
    const body: UserModel = { username, password };
    return this.http.post<ApiResponseModel<string>>(`${API_URL}/login`, body);
  }

  signup(user: UserModel): Observable<UserModel> {
    return this.http.post<ApiResponseModel<UserModel>>(`${API_URL}/signup`, user).pipe(map(res => res.data));
  }

  confirmUsername(username: string): Observable<boolean> {
    return this.http.get<ApiResponseModel<boolean>>(`${API_URL}/confirm-username/${username}`).pipe(map(res => res.data));
  }

  getUserByToken(): Observable<UserModel> {
    const token = localStorage.getItem('authToken')?.trim();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiResponseModel<UserModel>>(`${API_URL}/me`, { headers }).pipe(map(res => res.data));
  }

}