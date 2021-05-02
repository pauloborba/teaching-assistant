import moment = require("moment");
import { DateLimit } from "../../common/agendamentoDeRoteiro";

export class VerificaPrazo {

    compareDates(dateLimit:DateLimit):boolean{

        const format = "DD-MM-YYYY HH:mm:ss";
        var datafimdate = moment(dateLimit.datalimite,format);
        var datetimeatual = moment(new Date()).format(format);
        var datetimefim = moment(datafimdate).format(format);
      
        return !(datetimeatual > datetimefim);
  }
}