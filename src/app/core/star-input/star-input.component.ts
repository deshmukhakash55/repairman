import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-input',
  templateUrl: './star-input.component.html',
  styleUrls: ['./star-input.component.scss'],
})
export class StarInputComponent implements OnInit {

  public stars: number;
  @Output() updateStarsFeedback = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  public updateStars(event: any): void {
    this.stars = parseInt(event.target.value);
    this.updateStarsFeedback.emit(this.stars);
  }

}
