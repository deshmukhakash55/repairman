import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Page } from './commontypes';

@Injectable({
  providedIn: 'root'
})
export class NaviService {

  private pages: Page[];
  private currentPage: Page;

  constructor(private router: Router) {
    this.pages = [
      {
        name: 'Home',
        path: '/tabs/home'
      },
      {
        name: 'Search',
        path: '/tabs/search'
      },
      {
        name: 'Repairs',
        path: '/tabs/repairs'
      },
      {
        name: 'Account',
        path: '/tabs/account'
      },
      {
        name: 'Track',
        path: '/track'
      }
    ];

    const currentPath = this.router.url;
    this.currentPage = this.pages.find( (page: Page) => currentPath.indexOf(page.path) !== -1);
  }

  public getCurrentPage(): Observable<Page> {
    return of(this.currentPage);
  }

  public setCurrentPage(path: string): void {
    this.currentPage = this.pages.find( (page: Page) => path.indexOf(page.path) !== -1);
  }

}