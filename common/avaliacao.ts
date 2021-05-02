export class Avaliacao {
  meta: String = '';
  nota: String = '';

  copyFrom(from: Avaliacao): void {
    this.meta = from.meta;
    this.nota = from.nota;
  }
}
