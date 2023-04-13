import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from 'src/app/layout/toolbar/toolbar.component';
import { ParameterViewComponent } from 'src/app/layout/parameter-view/parameter-view.component';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/app/shared/animations/slide-in-animation';

@Component({
  selector: 'cmaj-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ToolbarComponent, ParameterViewComponent, RouterOutlet],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  constructor(private contexts: ChildrenOutletContexts, private router: Router) {}

  ngOnInit(): void {
    this.router.initialNavigation();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
