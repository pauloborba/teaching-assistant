import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDesempenhoComponent } from './relatorio-desempenho.component';

describe('RelatorioDesempenhoComponent', () => {
  let component: RelatorioDesempenhoComponent;
  let fixture: ComponentFixture<RelatorioDesempenhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioDesempenhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioDesempenhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
