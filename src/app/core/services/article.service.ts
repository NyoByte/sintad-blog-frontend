import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { ArticleCrudModel } from '~models/article.model';
import { ApiResponseModel, ArticleModel, PageResponseModel } from '~models/index';

const API_URL = `${environment.HOST_BACKEND_API}/articles`;

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAllArticles(page: number): Observable<PageResponseModel<ArticleModel>> {
    return this.http.get<ApiResponseModel<PageResponseModel<ArticleModel>>>(`${API_URL}?page=${page}`).pipe(map(res => res.data));
  }

  getArticleById(articleId: number): Observable<ArticleModel> {
    return this.http.get<ApiResponseModel<ArticleModel>>(`${API_URL}/${articleId}`).pipe(map(res => res.data));
  }

  getPopularArticles(): Observable<ArticleModel[]> {
    return this.http.get<ApiResponseModel<ArticleModel[]>>(`${API_URL}/popular`).pipe(map(res => res.data));
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken')?.trim();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  create(article: ArticleModel): Observable<ArticleModel> {
    return this.http.post<ApiResponseModel<ArticleModel>>(API_URL, article, {
      headers: this.getAuthHeaders()
    }).pipe(map(res => res.data));
  }

  update(articleId: number, article: ArticleCrudModel): Observable<ArticleModel> {
    return this.http.put<ApiResponseModel<ArticleModel>>(`${API_URL}/${articleId}`, article, {
      headers: this.getAuthHeaders()
    }).pipe(map(res => res.data));
  }

  delete(articleId: number): Observable<void> {
    return this.http.delete<ApiResponseModel<void>>(`${API_URL}/${articleId}`, {
      headers: this.getAuthHeaders()
    }).pipe(map(() => { }));
  }

  getMyArticles(): Observable<ArticleModel[]> {
    return this.http.get<ApiResponseModel<ArticleModel[]>>(`${API_URL}/owned`, {
      headers: this.getAuthHeaders()
    }).pipe(map(res => res.data));
  }

}