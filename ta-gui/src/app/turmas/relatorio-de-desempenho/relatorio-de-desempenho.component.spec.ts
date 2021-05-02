import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDeDesempenhoComponent } from './relatorio-de-desempenho.component';

describe('RelatorioDeDesempenhoComponent', () => {
  let component: RelatorioDeDesempenhoComponent;
  let fixture: ComponentFixture<RelatorioDeDesempenhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioDeDesempenhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioDeDesempenhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
