import { Injectable } from '@angular/core';
import { AUTH_STORAGE_KEYS } from './constants';

@Injectable({
  providedIn: 'root',
})
export class Token {

  set(token: string): void {
    localStorage.setItem(
      AUTH_STORAGE_KEYS.token,
      token
    );
  }

  get(): string | null {
    return localStorage.getItem(AUTH_STORAGE_KEYS.token);
  }

  clear(): void {
    localStorage.removeItem(AUTH_STORAGE_KEYS.token);
  }

  exists(): boolean {
    return !!this.get();
  }

}
