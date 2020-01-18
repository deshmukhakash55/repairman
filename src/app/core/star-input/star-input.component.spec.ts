import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StarInputComponent } from './star-input.component';

describe('StarInputComponent', () => {
  let component: StarInputComponent;
  let fixture: ComponentFixture<StarInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarInputComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
