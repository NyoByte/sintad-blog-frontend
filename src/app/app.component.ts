import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import { registerCustomIcons } from '~core/icons/custom-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private iconService: NzIconService) { }

  ngOnInit(): void {
    registerCustomIcons(this.iconService);
  }

}