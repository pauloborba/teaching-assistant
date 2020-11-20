import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscrepantesComponent } from './discrepantes.component';

describe('DiscrepantesComponent', () => {
  let component: DiscrepantesComponent;
  let fixture: ComponentFixture<DiscrepantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscrepantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscrepantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
