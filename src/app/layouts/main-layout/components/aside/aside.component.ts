import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AuthService } from '~core/services';

@Component({
  selector: 'app-aside',
  imports: [RouterLink, NzMenuModule, NzIconModule, NzToolTipModule, CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent {
  @Input() isCollapsed!: boolean;

  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }

}