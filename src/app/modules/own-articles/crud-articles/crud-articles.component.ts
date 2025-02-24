import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ArticleService, AuthService } from '~core/services';
import { ArticleCrudModel, ArticleModel } from '~models/article.model';

@Component({
  selector: 'app-crud-articles',
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzAlertModule,
    ReactiveFormsModule, NzModalModule
  ],
  templateUrl: './crud-articles.component.html',
  styleUrl: './crud-articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudArticlesComponent implements OnChanges {
  validateForm!: FormGroup;

  @Input() isVisible!: boolean;
  @Input() item?: ArticleCrudModel;
  @Input() type: 'C' | 'U' = 'C';
  @Output() isVisibleChanged = new EventEmitter<boolean>();
  @Output() onDataChanged = new EventEmitter<boolean>();

  constructor(
    private fb: NonNullableFormBuilder,
    private articleService: ArticleService,
    private authService: AuthService
  ) {
    this.validateForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && this.isVisible) {
      if (this.item && this.type === 'U') {
        this.validateForm.patchValue({
          title: this.item.title,
          content: this.item.content
        });
      } else {
        this.validateForm.reset();
      }
    }
  }

  handleOk(): void {
    if (this.type === 'C') {
      this.onAdd();
    } else {
      this.onEdit();
    }
  }

  onAdd() {
    this.authService.getUserByToken().subscribe(user => {
      const newArticle: ArticleModel = {
        title: this.validateForm.get('title')?.value,
        content: this.validateForm.get('content')?.value,
        author: user,
        views: 0
      }
      this.articleService.create(newArticle).subscribe(res => {
        this.isVisible = false;
        this.isVisibleChanged.emit(this.isVisible);
        this.onDataChanged.emit();
      });
    })
  }

  onEdit() {
    this.item!.title = this.validateForm.get('title')?.value;
    this.item!.content = this.validateForm.get('content')?.value;
    this.articleService.update(this.item!.id, this.item!).subscribe(res => {
      this.isVisible = false;
      this.isVisibleChanged.emit(this.isVisible);
      this.onDataChanged.emit();
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleChanged.emit(this.isVisible);
  }

}