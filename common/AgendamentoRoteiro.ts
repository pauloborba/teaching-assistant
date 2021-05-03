import { Roteiro } from './roteiro';

export class AgendamentoRoteiro {
    dataInicio: string = "";
	dataFim: string = "";
    roteiro: Roteiro = null;

	constructor(r: Roteiro, di?: string, df?: string){
		this.roteiro = r;
		this.dataInicio = di;
		this.dataFim = df;
	}
	
    getDataInicio(): string {
        return this.dataInicio;
    }

    getDataFim(): string {
        return this.dataFim;
    }
    getRoteiro(): Roteiro {
        return this.roteiro;
    }
	
	
}