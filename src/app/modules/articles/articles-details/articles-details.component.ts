import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { format, formatDistance } from 'date-fns';
import { NzListModule } from 'ng-zorro-antd/list';
import { es } from 'date-fns/locale';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ArticleService, AuthService } from '~core/services';
import { ArticleModel, CommentModel, UserModel } from '~models/index';
import { WebsocketService } from '~core/services/websocket.service';

@Component({
  selector: 'app-articles-details',
  imports: [CommonModule,
    FormsModule,
    NzCardModule,
    NzAvatarModule,
    NzDividerModule,
    NzCommentModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule, NzListModule, NgTemplateOutlet, NzFormModule],
  templateUrl: './articles-details.component.html',
  styleUrl: './articles-details.component.scss',
})
export class ArticlesDetailsComponent implements OnInit {
  article!: ArticleModel;
  articleId!: number;

  userMe!: UserModel;
  newComment: string = '';
  comments: CommentModel[] = [];

  submitting = false;
  inputValue = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private wsService: WebsocketService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticleById(this.articleId).subscribe(data => {
      this.article = data;
      this.comments = data.comments ?? [];
    })
    this.authService.getUserByToken().subscribe(data => {
      this.userMe = data;
    });
    this.connect()
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm:ss');
  }

  formatDateComment(dateString: string): string {
    const date = new Date(dateString);
    return formatDistance(new Date(), date, { locale: es });
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    this.sendComment({
      user: this.userMe,
      articleId: this.articleId,
      content
    })
  }

  connect() {
    this.wsService.connect();
    this.wsService.getMessages().subscribe((msg) => {
      console.log('Mensaje recibido:', msg);
      this.submitting = false;
      this.comments.push(msg); // Agregar mensaje al array
    });
  }

  sendComment(comment: CommentModel) {
    this.wsService.sendComment(comment);
  }

  disconnect() {
    this.wsService.disconnect();
  }

}