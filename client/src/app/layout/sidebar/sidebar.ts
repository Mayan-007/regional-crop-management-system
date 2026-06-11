import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../shared/ui/material.imports';
import { Store } from '../../core/auth/store';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly store = inject(Store);

  readonly role = this.store.role;

  readonly menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    },

    {
      label: 'Reports',
      icon: 'analytics',
      route: '/reports',

      roles: ['SUPER_ADMIN'],
    },
  ];
}
