import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() total: number = 0;
  @Input() page: number = 0;

  @Output() pageChange = new EventEmitter<number>();

  onPageChange(newPage: number): void {
    this.pageChange.emit(newPage);
  }

}