import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from 'src/app/layout/top-bar/top-bar.component';
import { ParameterViewComponent } from 'src/app/layout/parameter-view/parameter-view.component';
import { Router, RouterOutlet } from '@angular/router';
import * as packageJson from 'package.json';

@Component({
  selector: 'cmaj-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [TopBarComponent, ParameterViewComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  readonly version = packageJson.version;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.initialNavigation();
  }
}
