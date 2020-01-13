import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage implements OnInit {

  public title: string;

  constructor() {
    this.title = 'Account';
  }

  public ngOnInit(): void {}

}
