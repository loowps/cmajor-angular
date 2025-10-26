import { Component, OnInit, inject } from '@angular/core';
import { TopBarComponent } from 'src/app/layout/top-bar/top-bar.component';
import { Router, RouterOutlet } from '@angular/router';
import * as packageJson from 'package.json';

@Component({
  selector: 'cmaj-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [TopBarComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  readonly version = packageJson.version;

  ngOnInit(): void {
    this.router.initialNavigation();
  }
}
