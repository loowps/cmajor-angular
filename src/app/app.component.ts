import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from 'src/app/layout/toolbar/toolbar.component';
import { ParameterViewComponent } from 'src/app/layout/parameter-view/parameter-view.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'cmaj-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ToolbarComponent, ParameterViewComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.initialNavigation();
  }
}
