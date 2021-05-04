import { Component, OnInit } from '@angular/core';

import { Aluno } from '../../../../common/aluno';
import { ImportacaoService } from './importacao.service';

import {AlunoFactory, AlunoData} from '../../../../common/alunofactory';
@Component({
  selector: 'app-importacao',
  templateUrl: './importacao.component.html',
  styleUrls: ['./importacao.component.css']
})
export class ImportacaoComponent implements OnInit {
  factory: AlunoFactory;
  constructor(private ImportacaoService: ImportacaoService) {
    this.factory = new AlunoFactory();
  }

  ngOnInit(): void {
  }
  
  handleFiles(evt): void {
    // Armazenar a extensão do arquivo
    var exts = evt.target.files[0].name.slice(-4);

    // Condição para só aceitar .csv
    if(exts != '.csv') {
      // Mensagem de erro requisitada pelas especificações
      alert('Favor inserir um formato .csv válido.');
      // Resetar o input
      evt.target.value = '';

      return;
    }
    this.getAsText(evt.target.files[0]);
  }

  enviarAlunos(alunos: Aluno[]): void {
    this.ImportacaoService.cadastrarAlunos(alunos)
      .subscribe(
        ar => {
          // Caso de sucesso, para repetidos ou não
          if (ar != null) {
            // Caso de sucesso para não repetidos
            if(ar.length == 0){
              console.log("Deu muito certo :)");
            }else{
              // Caso de sucesso para um número X de alunos
              alert(`Dos alunos da planilha, já haviam ${ar.length} cadastrados.`);
            }
          }
          // Caso de falha 
          else {
            console.log('deu errado :(');
          }
        },
        msg => { alert(msg.message); }
      );
  }


  getAsText(csv): void {
    // Referência à ferramenta que vai interpretar o .csv
    var reader = new FileReader();
    // Tentativa de leitura
    reader.readAsText(csv);
    // Tratamendo para quando funciona o load do .csv
    reader.onload = this.loadHandler.bind(this);
    // Tratamento para quando dá erro no load do .csv
    reader.onerror = this.errorHandler.bind(this);
  }

  loadHandler(event, processData: Function): void {
    // Pegar o conteúdo do .csv e salvar na variável csv
    var csv = event.target.result;
    // Chamar a função que vai tratar o .csv
    this.processData(csv);
  }
  
  errorHandler(event, processData: Function) {
    if(event.target.error.name == "NotReadableError") {
      alert("Não é possível ler o arquivo.");
    }
  }

  processData(csv: string): void {
    var csvLines = csv.split(/\r\n|\n/);
    // Retirar as 4 primeiras linhas que sempre vão vir
    csvLines = csvLines.slice(4, csvLines.length - 1);
    // Filtrar para que entrem apenas os alunos
    csvLines = csvLines.filter(element => element != ',,');
    if(csvLines.length == 0){
      alert('Foi selecionada uma planilha vazia.');
      return;
    }
    this.createAlunos(csvLines);
  }

  createAlunos(linhas: String[]): void{
    // Criar um array de arrays, onde a primeira posição é o Nome do aluno, e 
    // a segunda posição é a tripla (CIn, GitHub, Slack)
    const alunosData: AlunoData[] = linhas.map((aluno) => {
      const alunoArray = aluno.split(',').slice(0, 2)
        const alunoData: AlunoData = {
          nome: alunoArray[0],
          email: alunoArray[1].split('::')[0].trim() + '@cin.ufpe.br'
        }

      return alunoData;
  });

  if (this.checkEmailVazio(alunosData)){
    alert('A planilha não contém os dados de email de um ou mais alunos!');
    return;
  }

  // Array de alunos a ser retornado
  const alunosList: Aluno[] = alunosData.map(alunoData => this.factory.criarAluno(alunoData));

  this.EnviarAlunos(alunosList);

  }

  EnviarAlunos(alunos: Aluno[]): void{
    this.enviarAlunos(alunos);
  }

  checkEmailVazio(alunoData: AlunoData[]): Boolean {
    return !!alunoData.find(aluno => aluno.email === '@cin.ufpe.br');
  }

}
