import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Token } from './token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(Token);
  const accessToken = token.get();

  if(!accessToken) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return next(cloned);
};
