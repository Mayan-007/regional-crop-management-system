import { Routes } from '@angular/router';

export const routes: Routes = [
//   {
//     path: 'auth',
//     loadChildren: () =>
//       import('./features/auth/auth.routes')
//         .then(r => r.AUTH_ROUTES)
//   },

  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell')
        .then(c => c.Shell),

    children: [
    //   {
    //     path: 'dashboard',
    //     loadChildren: () =>
    //       import('./features/dashboard/dashboard.routes')
    //         .then(r => r.DASHBOARD_ROUTES)
    //   },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];