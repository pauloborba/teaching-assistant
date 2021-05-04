export class EmailSender {

  enviarEmail(to: string, subject: string, message: string, from: string = 'teaching-assitant@ta.host'): boolean {
    console.log(
        '--- Mensagem de email ---\n' +
        'De: <' + from + '>\n' +
        'Para: <' + to + '>\n' +
        'Assunto: ' + subject + '\n' +
        'Mensagem: ---------------\n'
        + message + '\n' +
        '-------------------------\n');
    return true;
  }

}
