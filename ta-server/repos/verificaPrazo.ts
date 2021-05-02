import moment = require("moment");
import { DateLimit } from "../../common/agendamentoDeRoteiro";

export class VerificaPrazo {

    compareDates(dateLimit:DateLimit):boolean{
      
        const format = "DD-MM-YYYY HH:mm:ss";
        var datafimdate = moment(dateLimit.datafim,format);
        var dataatualdate = new Date();
        var datetimeatual = moment(dataatualdate).format(format);
        var datetimefim = moment(datafimdate).format(format);
      
        if( datetimeatual > datetimefim){
          return false;
        }
        else{
          return true;
        }
      }

}