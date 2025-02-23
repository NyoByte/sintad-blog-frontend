import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  imports: [RouterOutlet, ScrollingModule, NzLayoutModule, AsideComponent, HeaderComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isCollapsed = true;

  handleCollapseChange(collapsed: boolean): void {
    this.isCollapsed = collapsed;
  }

}