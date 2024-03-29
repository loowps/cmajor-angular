import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'cmaj-toolbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private router: Router) {}

  getRouterLink() {
    return this.router.url === '/about' ? '' : '/about';
  }
}
