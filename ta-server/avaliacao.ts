export class Avaliacao {
    meta: String = "";
    nota: String = "";
    
     setMeta(metaRecebida: String):void {
         this.meta = metaRecebida;
     }

     setNota(notaRecebida: String):void {
         this.nota = notaRecebida
     }

     getMeta(): String {
         return this.meta;
     }

     getNota(): String {
         return this.nota;
     }
 }