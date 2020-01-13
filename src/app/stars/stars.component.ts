import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {

  @Input() public stars: any;
  public integerPortion: number;
  public decimalPortion: number;
  public remainingStars: number;
  public Arr: any;

  constructor() {}

  public ngOnInit(): void {
    this.Arr = Array;
    this.integerPortion = Math.floor(this.stars);
    this.decimalPortion = this.stars % 1;
    this.remainingStars = Math.floor(5 - this.stars);
  }

}
