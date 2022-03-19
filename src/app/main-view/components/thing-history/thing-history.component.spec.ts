import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingHistoryComponent } from './thing-history.component';

describe('ThingHistoryComponent', () => {
  let component: ThingHistoryComponent;
  let fixture: ComponentFixture<ThingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThingHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
