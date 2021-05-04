export class Avaliacao {
  meta: String = '';
  nota: String = '';

  constructor(meta: string = '', nota: string = '') {
    this.meta = meta;
    this.nota = nota;
  }
}
