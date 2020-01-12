import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackPage } from './track.page';

describe('TrackPage', () => {
  let component: TrackPage;
  let fixture: ComponentFixture<TrackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
