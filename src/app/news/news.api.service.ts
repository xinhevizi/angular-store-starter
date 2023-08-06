import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '../app.constants';

@Injectable()
export class NewsApiService {
  private actionUrl: string;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private configuration: Configuration,
  ) {
    console.warn('NewsApiService.constructor');
    this.actionUrl = `${this.configuration.Server}/api/news/`;

    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
  }

  getAllGroups(): Observable<string[]> {
    return this.http.get<string[]>(this.actionUrl, { headers: this.headers });
  }
}
