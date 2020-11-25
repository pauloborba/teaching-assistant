import { Component, OnInit } from '@angular/core';
import {Matricula} from '../../../../common/matricula'
import {Turma} from '../../../../common/turma'
import {DiscrepantesService} from './discrepantes.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-discrepantes',
  templateUrl: './discrepantes.component.html',
  styleUrls: ['./discrepantes.component.css']
  
})
export class DiscrepantesComponent implements OnInit {

  //nomeTurmaAux: string = ""
  nomeTurma: string = ""
  turma: Turma
  matriculas: Matricula[] = []
  header: String[] = []
  metas: String[] = []
  totalDiscrepantes = 0
  porcentagemDiscrepantes = 0
  totalRealizouAutoAvaliacao = 0
  clickedBtm = false
  

  constructor(private discrepantesService: DiscrepantesService) { }

  ngOnInit() {
  }

  carregarMatriculas(){
    console.log("CHAMANDOOO")
    this.totalDiscrepantes = 0
    this.porcentagemDiscrepantes = 0
    this.totalRealizouAutoAvaliacao = 0
    this.metas = []
    //this.nomeTurma = this.nomeTurmaAux
    
      //Chamando autoavaliacao.service que faz a req pro server para pegar a turma indicada pelo usuário
      this.discrepantesService.getTurma(this.nomeTurma).subscribe(

        (a) => { 

          this.turma = new Turma()
          this.turma.descricao = a.descricao
          this.turma.metas = a.metas
          console.log(this.turma)
          this.matriculas = this.turma.getMatriculas() 
          this.turma.metas.forEach( meta => {
            this.metas.push(meta)
          })
         
          this.loadTotalDiscrepantes()
          this.loadPorcentagemDiscrepantes()
          
        },
        (msg) => { alert(msg.message); }

      )

      //this.autoAvaliacaoService.getMatriculas().

      //Pegando as matriculas da turma
      

      //Configurando Header
      this.header = ["Nome", "CPF", "Email"]
      
      console.log(this.totalDiscrepantes + "funcao carregar")
     
  }


  loadTotalDiscrepantes(){
      var count = 0
      this.turma.getMatriculas().forEach((matricula) =>{

        if(matricula.avaliacoes.length==matricula.autoAvaliacoes.length){
          console.log("FEZ AUTOAV")
        
          this.totalRealizouAutoAvaliacao++
          console.log(this.totalRealizouAutoAvaliacao)
          if(this.matriculaDiscrepancia(matricula)){
            count++
          }
        }
      })

      this.totalDiscrepantes = count

      //this.loadPorcentagemDiscrepantes()
  }

  loadPorcentagemDiscrepantes(){
    if(this.totalDiscrepantes==0){
      this.porcentagemDiscrepantes = 0
    }else{
      console.log(this.totalDiscrepantes)
      console.log(this.porcentagemDiscrepantes)
      this.porcentagemDiscrepantes = this.totalDiscrepantes/this.totalRealizouAutoAvaliacao
    }

    this.clickedBtm = true

  }
  corDaLinha(matricula: Matricula): String{
    //Checa se foi feita a autoavaliacao de todas as metas
    if(matricula.avaliacoes.length==matricula.autoAvaliacoes.length){
      if(this.matriculaDiscrepancia(matricula)){
        return "discrepante"
      }else{
        return "tr"
      }

    //Caso não tenha sido feita todas as autoavaliacoe
    }else{
      return "incompleta"
    }
   
  }

  matriculaDiscrepancia(matricula: Matricula):boolean{
    var discrepantes = 0

    //Checa se foi feita a autoavaliacao de todas as metas

      matricula.avaliacoes.forEach((avaliacao) => {
        
          let autoavaliacao = matricula.autoAvaliacoes.find(autoavaliacao => autoavaliacao.meta == avaliacao.meta);
         
          if(avaliacao.nota=="MANA" && autoavaliacao.nota=="MPA"){
              discrepantes++
          }else if(avaliacao.nota=="MANA" && autoavaliacao.nota=="MA"){
            discrepantes++
          }else if(avaliacao.nota=="MPA" && autoavaliacao.nota=="MA"){
            discrepantes++
          }
      })

      //Checando se a autoavaliacao do aluno foi discrepante
      if(discrepantes/matricula.avaliacoes.length>=0.25){
        return true
      }else{
        return false
      }

  }

  nota(selector: boolean, matricula: Matricula, meta: string){

    if(selector){
      let avaliacao = matricula.avaliacoes.find(avaliacao => avaliacao.meta == meta)
      if(avaliacao!= null){
        return avaliacao.nota
      }else{
        return null
      }
    }else{
      let autoavaliacao = matricula.autoAvaliacoes.find(autoavaliacao => autoavaliacao.meta == meta)
      
      if(autoavaliacao != null){
        return autoavaliacao.nota
      }else{
        return null
      }
    }
  }

  totalDiscrepante():Number{
    return this.totalDiscrepantes
  }
  
}

