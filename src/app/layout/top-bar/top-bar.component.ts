import { Component, inject } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'cmaj-top-bar',
  imports: [RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  private router = inject(Router);

  getRouterLink() {
    return this.router.url === '/about' ? '' : '/about';
  }
}
