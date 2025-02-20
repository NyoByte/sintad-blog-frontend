import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AuthService } from '~core/services';

@Component({
  selector: 'app-header',
  imports: [NzLayoutModule, NzIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() isCollapsed!: boolean;
  @Output() isCollapsedChange = new EventEmitter<boolean>();

  toggleAside(): void {
    this.isCollapsedChange.emit(!this.isCollapsed);
  }

}