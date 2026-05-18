import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MATERIAL_IMPORTS } from '../../shared/ui/material.imports';

@Component({
  selector: 'app-sidebar',
  standalone: true,

  imports: [
    RouterLink,
    ...MATERIAL_IMPORTS
  ],

  templateUrl: './sidebar.html'
})
export class Sidebar {

  menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },

    {
      label: 'Crops',
      icon: 'grass',
      route: '/crops'
    },

    {
      label: 'Farmers',
      icon: 'people',
      route: '/farmers'
    }
  ];
}