import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { pageTransition } from '../animations';

@Component({
  selector: 'Sidebar',
  animations: [pageTransition],
  template: `
    <Header class="header sticky top-0" [(showSidebar)]="showSidebar"></Header>
    <div class="content" [class.--hidden]="!showSidebar" [@pageTransition]="getRouteLevel(routerOutlet)">
      <router-outlet #routerOutlet="outlet"></router-outlet>
    </div>
  `,
  styles: [`

    .header {
      z-index: 10;
      // height: var(--header-height);
      box-shadow: var(--box-shadow);
    }

    .content {
      overflow-x: hidden;
      overflow-y: overlay;
      transition: height var(--transition-duration) var(--transition-easing);
    }

    @media screen and (min-width: 768px) {
      height: calc(100vh - var(--header-height));
    }

    .content.--hidden {
      overflow: hidden;
      height: 0;
    }

  `]
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {
  }

  showSidebar = true;
  private susbcriptions: Subscription[] = [];

  ngOnInit() {
    this.susbcriptions.push(
      this.router.events.subscribe(() => this.showSidebar = true)
    );
  }

  ngOnDestroy() {
    this.susbcriptions.forEach((subscription) => subscription.unsubscribe());
    this.susbcriptions = [];
  }

  getRouteLevel(routerOutlet: RouterOutlet) {
    return routerOutlet.activatedRouteData.level;
  }
}
