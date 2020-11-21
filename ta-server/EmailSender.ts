export class EmailSender {
  
  enviarEmail(from: string, to: string, subject: string, message: string): boolean {
    console.log("Mensagem de email de " + from + " para " + to + "\n" + subject + "\n" + message)
    return true;
  }

}