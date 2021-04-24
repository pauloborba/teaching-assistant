import { Roteiro } from './roteiro';
import { RespostaDeQuestao } from './respostaDeQuestao';

export class RespostaDeRoteiro {
  roteiro: Roteiro;
  respostasDeQuestoes: RespostaDeQuestao[] = [];
  nota: String;
}
