import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage implements OnInit{

  @Input('headerTitle') public headerTitle:string;

  constructor() {}

  public ngOnInit(): void {
    this.headerTitle = 'Account';
  }

}
