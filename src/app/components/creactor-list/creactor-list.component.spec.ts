import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreactorListComponent } from './creactor-list.component';

describe('CreactorListComponent', () => {
  let component: CreactorListComponent;
  let fixture: ComponentFixture<CreactorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreactorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreactorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
