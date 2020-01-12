import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepairsPage } from './repairs.page';

describe('RepairsPage', () => {
  let component: RepairsPage;
  let fixture: ComponentFixture<RepairsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepairsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
