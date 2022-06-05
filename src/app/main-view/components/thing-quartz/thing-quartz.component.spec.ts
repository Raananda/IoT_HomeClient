import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingQuartzComponent } from './thing-quartz.component';

describe('ThingQuartzComponent', () => {
  let component: ThingQuartzComponent;
  let fixture: ComponentFixture<ThingQuartzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThingQuartzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingQuartzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
