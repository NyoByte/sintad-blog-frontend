import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  template: `
      <div class="login-container">
        <router-outlet></router-outlet>
      </div>
    `
})
export class AuthLayoutComponent { }