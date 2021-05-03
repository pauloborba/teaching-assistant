import { TestBed } from '@angular/core/testing';

import { AtribuirRoteiroService } from './atribuir-roteiro.service';

describe('AtribuirRoteiroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtribuirRoteiroService = TestBed.get(AtribuirRoteiroService);
    expect(service).toBeTruthy();
  });
});
