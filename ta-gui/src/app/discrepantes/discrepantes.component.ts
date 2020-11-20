import { Component, OnInit } from '@angular/core';
import {Matricula} from '../../../../common/matricula'
import {Turma} from '../../../../common/turma'
import {DiscrepantesService} from './discrepantes.service'


@Component({
  selector: 'app-discrepantes',
  templateUrl: './discrepantes.component.html',
  styleUrls: ['./discrepantes.component.css']
})
export class DiscrepantesComponent implements OnInit {

  nomeTurma: string = ""
  turma: Turma
  matriculas: Matricula[] = []
  header: String[] = []
  metas: String[] = []
  totalDiscrepantes = 0
  clickedBtm = false

  constructor(private discrepantesService: DiscrepantesService) { }

  ngOnInit() {
  }

  carregarMatriculas(){
    this.totalDiscrepantes = 0
    this.metas = []
    
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
        },
        (msg) => { alert(msg.message); }

      )

      //this.autoAvaliacaoService.getMatriculas().

      //Pegando as matriculas da turma
      

      //Configurando Header
      this.header = ["Nome", "CPF", "Email"]
      this.clickedBtm = true
      
  }

  corDaLinha(matricula: Matricula): String{
    var discrepantes = 0


    //Checa se foi feita a autoavaliacao de todas as metas
    if(matricula.avaliacoes.length==matricula.autoAvaliacoes.length){

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
        this.totalDiscrepantes++
        return "discrepante"
      }else{

        return "tr"
        
      }

    //Caso não tenha sido feita todas as autoavaliacoe
    }else{
      
      return "incompleta"
    }
   
  }


  nota(selector: boolean, matricula: Matricula, meta: string){
    console.log(meta)
    console.log(matricula.avaliacoes)
    if(selector){
      let avaliacao = matricula.avaliacoes.find(avaliacao => avaliacao.meta == meta)
      if(avaliacao!= null){
        console.log("avaliacao")
        return avaliacao.nota
      }else{
        console.log("deu null")
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

  
}

