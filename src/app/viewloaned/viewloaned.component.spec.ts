import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewloanedComponent } from './viewloaned.component';

describe('ViewloanedComponent', () => {
  let component: ViewloanedComponent;
  let fixture: ComponentFixture<ViewloanedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewloanedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewloanedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
