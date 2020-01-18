import { Injectable } from '@angular/core';
import { Feedback } from './commontypes';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private pendingFeedbacks: Feedback[];
  private doneFeedbacks: Feedback[];

  constructor() {
    this.pendingFeedbacks = [
      {
        repairId: '',
        repairmanName: 'Steven Jones',
        feedback: '',
        stars: -1,
        date: null
      }
    ];
    this.doneFeedbacks = [];
  }

  public getPendingFeedback(): Observable<Feedback[]> {
    return of(this.pendingFeedbacks);
  }

  public setPendingFeedback(feedback: Feedback): void {
    this.pendingFeedbacks = this.pendingFeedbacks.filter( (pendingFeedback: Feedback) => pendingFeedback.repairId !== feedback.repairId);
    this.doneFeedbacks.push(feedback);

    //TODO send feedback to backend server

  }

}
