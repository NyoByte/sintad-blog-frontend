import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

// const API_AUTH_KEYCLOAK_URL = `${environment.HOST_AUTH_KEYCLOAK}/${environment.keycloakRealm}/protocol/openid-connect/token`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private currentTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  //   // Obtener el token de acceso
  //   getToken() {
  //     return this.currentTokenSubject.asObservable();
  // }

  // // Guardar el token en el BehaviorSubject
  // setToken(token: string) {
  //     this.currentTokenSubject.next(token);
  // }
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['auth/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  nextLogin(res: any) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('access_token', res.access_token);
    this.router.navigate(['welcome']);

  }

  login(username: string, password: string): Observable<any> {
    // const body = this.setBodyKeycloak(username, password);
    // return this.http.post<any>(API_AUTH_KEYCLOAK_URL, body.toString(), {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   })
    // });
    if (username === 'admin' && password === 'admin') {
      return of(true);
    } else {
      return of(false);
    }
  }

  setBodyKeycloak(username: string, password: string): URLSearchParams {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    // body.set('client_id', `${environment.keycloakClientId}`);
    body.set('username', username);
    body.set('password', password);
    return body;
  }

}