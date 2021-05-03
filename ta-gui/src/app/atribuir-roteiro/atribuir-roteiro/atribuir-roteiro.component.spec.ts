import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtribuirRoteiroComponent } from './atribuir-roteiro.component';

describe('AtribuirRoteiroComponent', () => {
  let component: AtribuirRoteiroComponent;
  let fixture: ComponentFixture<AtribuirRoteiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtribuirRoteiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtribuirRoteiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
