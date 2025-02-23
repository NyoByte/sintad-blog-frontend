import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
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

}