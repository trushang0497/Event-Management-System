import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateEventComponent } from './generate-event.component';

describe('GenerateEventComponent', () => {
  let component: GenerateEventComponent;
  let fixture: ComponentFixture<GenerateEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
