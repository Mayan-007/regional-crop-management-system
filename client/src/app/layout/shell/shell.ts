import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  isSidebarOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.update((open) => !open);
  }
}
