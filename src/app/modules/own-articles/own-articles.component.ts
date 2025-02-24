import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ArticleService } from '~core/services';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { CrudArticlesComponent } from "./crud-articles/crud-articles.component";
import { ArticleCrudModel } from '~models/article.model';
import { format } from 'date-fns';

@Component({
  selector: 'app-own-articles',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzDividerModule,
    NzFormModule,
    NzRadioModule,
    NzSwitchModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    CrudArticlesComponent
  ],
  templateUrl: './own-articles.component.html',
  styleUrl: './own-articles.component.scss',
})
export class OwnArticlesComponent implements OnInit {
  listOfData: readonly any[] = [];

  isVisible = false;
  item: ArticleCrudModel = {} as ArticleCrudModel;
  type: 'C' | 'U' = 'C';

  constructor(
    private modal: NzModalService,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.onDataChanged();
  }

  onDataChanged() {
    this.articleService.getMyArticles().subscribe(data => {
      this.listOfData = data
    })
  }

  onAdd() {
    this.type = 'C';
    this.isVisible = true;

  }

  onEdit(id: number, title: string, content: string) {
    this.type = 'U';
    this.isVisible = true;
    this.item = { id, title, content }
  }

  onDelete() {
    alert("delete")
  }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm:ss');
  }

}