import moment = require("moment");
import { AgendamentoRoteiro} from "../../common/agendamentoDeRoteiro";

export class VerificaPrazo {

    compareDates(dateLimit:AgendamentoRoteiro):boolean{

        const format = "DD-MM-YYYY HH:mm:ss";
        var datalimitedate = moment(dateLimit.datalimite,format);

        var datetimeatual = moment(new Date()).format(format);
        var datetimefim = moment(datalimitedate).format(format);
      
        return (datetimefim > datetimeatual);
  }
}