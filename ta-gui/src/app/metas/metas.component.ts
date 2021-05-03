import { Component, OnInit } from '@angular/core';

import { Turma } from '../../../../common/turma';
import { TurmasService } from '../turmas/turmasService';
import { Aluno } from '../../../../common/aluno';
import { SheetImportService} from '../import/SheetImportService'
import { Matricula } from '../../../../common/matricula';

@Component({
  selector: 'app-turmas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  turmas: Turma[] = [];
  turmasDescricao: string[] =[];
  metasTurma: string[] = [];
  turmaDestino: string;
  turmaOrigem: string;
  metasDestino: string [] = [];
  metasOrigem: string[] = [];
  metasDiscrepantes: string[];
  metasIguais: string[];
  confirm = false;
  col = -1;
  col1 = 0;

  constructor(private turmasService: TurmasService,private sheetImportService: SheetImportService) { //erro aqui!
  }

  ngOnInit() {
    this.turmasService.getTurmas()
             .subscribe(
               res => {
                 let descricoes = res;
                 console.log(res)
                 this.turmasDescricao = descricoes
               },
               msg => { alert(msg.message); }
              );
    this.getmatriculas();         
  }

  isShow = false;
  isShowClone = false;

batata(){
  console.log("funcionando");
  //checa se estava pegando a turma selecionada
}

  toggleDisplayMainButton() {
    if (this.isShow == false){
      this.isShow = !this.isShow;
    }
  }
  toggleDisplayHide() {
      this.isShow = false;
  } 
  
  toggleDisplayShowClone(){
    if (confirm("voce realmente deseja clonar as metas?")){
      this.clonarMetas(this.turmaDestino, this.turmaOrigem);
      setTimeout(() => this.toggleDisplayHide(), 500);
    }
  }

  

  clonarMetas(turmaDestino: string, turmaOrigem: string){
    // this.metasDestino = this.getMetas(this.turmaDestino); //await
    // this.metasOrigem = this.getMetas(this.turmaOrigem); //await

    this.metasDiscrepantes = this.metasOrigem
                 .filter(x => !this.metasDestino.includes(x));

    this.turmasService.postMetas(this.turmaDestino, this.metasDiscrepantes)
    .subscribe(
      ar => {
        this.metasDestino = ar;
        console.log(ar);
      },
       msg => {alert(msg.message);}
        
    )
        console.log(this.metasDestino);
    }

  getMetas(turma: string, tipo: "origem" | "destino"){
    this.turmasService.getMetas(turma)
    .subscribe(
      res => {
        const metas = res;
        if(tipo == "origem"){
          this.metasOrigem = metas;
        }else {
          this.metasDestino = metas;
        }
      },
      msg => { alert(msg.message); }
     );
  }

  //Métodos de Importação de Planilha
  //Apenas arquivos .csv
  matriculas:Matricula[]=[]
  isShowImport = false;
  curTurma = "ESS";
  arquivo = null;
  texto = "";

  toggleDisplayImport() {
    this.isShowImport = !this.isShowImport;
  }

  textof(texto){
    this.texto = texto;
  }

  uparArquivo(arquivo:FileList){
    this.arquivo = arquivo.item(0);
    let read = new FileReader

    read.readAsText(this.arquivo);
    read.onload = () => this.textof(read.result)

    if(this.confirm != true){
        this.getHasNota(); //extract method
      }
  }

   paraJSON(csv,colNota,colId){
    let convJSON = [];
    let lines = csv.split("\r\n");
    let header = lines[0].split(",");

    let temp = header[0];
    header[0] = header[colId];//Simplesmente coloca a coluna de identificação de aluno
    header[colId] = temp;     //selecionada pelo usuário para a primeira posição

  
    for(let i = 1; i < lines.length; i++){//cria um objeto JSON da planilha, fileira por fileira
      let mergedLine = {};
      let currentline=lines[i].split(",");
      let temp = currentline[0];

      currentline[0] = currentline[colId];
      currentline[colId] = temp;
  
      for(let j = 0; j < header.length; j++){ //montando uma fileira {Id, Meta1, ..., MetaN}
        mergedLine[header[j]] = currentline[j];
      }

      if(colNota != -1){ //Se uma coluna é selecionada apenas ela é importada
        for(let a = 1;a < header.length;a++){
          if(a != colNota){
          delete mergedLine[header[colNota]];
          }
        }
      }
      convJSON.push(mergedLine);
  
    }
    return JSON.parse(JSON.stringify(convJSON)); 
  }

  

  getHasNota(){
    this.sheetImportService.hasnota(this.curTurma)
      .subscribe(
        a => {
          console.log(a);
          if(a == true){
            alert("Essa turma já possui notas preenchidas, importar uma planilha pode sobrescreve-las")
            this.confirm = true;
          }
          else{
            this.confirm = true;
          }
        }
      );
  }

  getmatriculas(){
    this.sheetImportService.getMatriculas(this.curTurma)
      .subscribe(
        a => {
          console.log(a);
          this.matriculas = a;
        }
      );
  }
  

  enviarPlanilha(){
    let sheetJSON = this.paraJSON(this.texto,this.col,this.col1);

    this.sheetImportService.atualizar(this.curTurma,sheetJSON)
    .subscribe(
      a => { 
          alert(a)
          this.confirm = false
      },
      msg => { alert(msg.message); }
     );
  }

}



