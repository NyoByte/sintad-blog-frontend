import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ArticleService } from '~core/services';
import { ArticleModel } from '~models/article.model';
import { CardArticleComponent } from '~shared/components/card-article/card-article.component';

@Component({
  selector: 'app-articles-popular',
  imports: [CommonModule, NzCardModule, NzGridModule, CardArticleComponent,],
  templateUrl: './articles-popular.component.html',
  styleUrl: './articles-popular.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesPopularComponent implements OnInit { 

    articles: ArticleModel[] = [];

    constructor(
      private articleService: ArticleService
    ) { }

    ngOnInit(): void {
      this.articleService.getPopularArticles().subscribe(data => {
        this.articles = data;
      });
    }

}