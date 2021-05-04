export class Avaliacao {
  meta: string = '';
  nota: string = '';

  copyFrom(from: Avaliacao): void {
    this.meta = from.meta;
    this.nota = from.nota;
  }
}
