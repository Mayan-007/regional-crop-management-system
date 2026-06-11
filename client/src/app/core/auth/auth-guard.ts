import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from './token';

export const authGuard: CanActivateFn = () => {
  const token = inject(Token);
  const router = inject(Router);

  if(token.exists()) {
    return true;
  }

  router.navigate([
    '/auth/login'
  ]);

  return false;
};
