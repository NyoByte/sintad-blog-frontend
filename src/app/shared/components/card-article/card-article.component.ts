import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { format } from 'date-fns';

@Component({
  selector: 'app-card-article',
  imports: [RouterLink, NzAvatarModule, NzCardModule, NzIconModule],
  templateUrl: './card-article.component.html',
  styleUrl: './card-article.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardArticleComponent {

  @Input() id!: number;
  @Input() author!: string;
  @Input() publicationDate!: string;
  @Input() title!: string;


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm:ss');
  }

}