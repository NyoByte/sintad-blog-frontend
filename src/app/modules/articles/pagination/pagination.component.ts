import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-pagination',
  imports: [NzPaginationModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  itemsPerPage = 8;
  @Input() total?: number = 0;
}
