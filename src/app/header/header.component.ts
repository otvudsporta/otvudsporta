import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'Header',
  template: `
    <a class="logo__link" routerLink="/">
      <img class="logo__image" src="assets/logo.svg" alt="Отвъд Спорта Лого" />
    </a>

    <!--
    <a routerLink="/">Добави Игрище</a>
    <a routerLink="/playgrounds">Игрища</a>
    <a *ngIf="(store.user$ | async) == null" routerLink="/login">Вход</a>
    <a *ngIf="(store.user$ | async) != null" routerLink="/" (click)="logout()">Изход</a>
    -->

    <div class="toggle border-primary br-md pointer" (click)="showSidebarChange.emit(!showSidebar)">
      <img class="toggle__image" [src]="showSidebar ? 'assets/chevron-up.svg' : 'assets/chevron-down.svg'" />
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--neutral-lighter);
      padding: 1rem;
    }

    .logo__link {
      display: flex;
      align-items: center;
    }

    .logo__image {
      margin: 0.5rem;
    }

    .toggle {
      user-select: none;
      box-shadow: var(--box-shadow);
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;

      transition: background var(--transition-duration) var(--transition-easing);
    }

    .toggle:hover {
      background: rgba(0, 0, 0, 0.02);
    }

    .toggle__image {
      width: 1rem;
      height: 1rem;
    }
  `]
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    public store: StoreService,
  ) {
  }

  @Input() showSidebar: boolean;
  @Output() showSidebarChange = new EventEmitter<boolean>();

  logout() {
    return this.authService.logout();
  }
}
