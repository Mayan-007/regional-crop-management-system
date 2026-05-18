import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MATERIAL_IMPORTS } from '../../shared/ui/material.imports';

import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-shell',
  standalone: true,

  imports: [
    RouterOutlet,
    Sidebar,
    Navbar,
    ...MATERIAL_IMPORTS
  ],

  templateUrl: './shell.html',
  styleUrls: ['./shell.scss']
})
export class Shell {}