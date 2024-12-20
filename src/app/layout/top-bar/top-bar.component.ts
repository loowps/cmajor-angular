import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'cmaj-top-bar',
  imports: [CommonModule, RouterLink, NgIf],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  constructor(private router: Router) {}

  getRouterLink() {
    return this.router.url === '/about' ? '' : '/about';
  }
}
