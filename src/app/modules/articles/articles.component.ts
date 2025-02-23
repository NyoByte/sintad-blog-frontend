import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CardArticleComponent } from '~shared/components/card-article/card-article.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ArticleService } from '~core/services';
import { ArticleModel } from '~models/article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  imports: [CommonModule, NzCardModule, NzGridModule, CardArticleComponent, PaginationComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  providers: [ArticleService]
})
export class ArticlesComponent implements OnInit {

  articles: ArticleModel[] = [];
  articlesTotal: number = 0;
  page = 0;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.loadArticles(this.page);
  }

  loadArticles(page: number): void {
    this.articleService.getAllArticles(page).subscribe(data => {
      this.articles = data.items;
      this.articlesTotal = data.totalCount;
      this.page = page;
    });
  }

  onPageChanged(newPage: number): void {
    this.loadArticles(newPage);
  }

}