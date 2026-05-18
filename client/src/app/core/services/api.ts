import { inject, Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  get<T>(endpoint: string) {
    return this.http.get<T>(
      `${this.apiUrl}/${endpoint}`
    );
  }

  post<T>(
    endpoint: string,
    payload: unknown
  ) {
    return this.http.post<T>(
      `${this.apiUrl}/${endpoint}`,
      payload
    );
  }

  put<T>(
    endpoint: string,
    payload: unknown
  ) {
    return this.http.put<T>(
      `${this.apiUrl}/${endpoint}`,
      payload
    );
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(
      `${this.apiUrl}/${endpoint}`
    );
  }
}