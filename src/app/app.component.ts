import { Component, OnInit } from '@angular/core';
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
  readonly version = packageJson.version;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.initialNavigation();
  }
}
