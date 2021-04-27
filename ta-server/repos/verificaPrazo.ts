import moment = require("moment");
import { DateLimit } from "../../common/agendamentoDeRoteiro";

export class VerificaPrazo {

    compareDates(dateLimit:DateLimit):boolean{
        console.log(dateLimit.datafim);
        
        const format = "DD-MM-YYYY HH:mm:ss";
        var datafimdate = moment(dateLimit.datafim,format);
        console.log(datafimdate);
        var dataatualdate = new Date();
        console.log(dataatualdate);
        var datetimeatual = moment(dataatualdate).format(format);
        var datetimefim = moment(datafimdate).format(format);
       console.log(datetimeatual);
       console.log(datetimefim);
       
       
        if( datetimeatual > datetimefim){
          console.log("fora do prazo");
          return false;
        }
        else{
          console.log("dentro do prazo");
          return true;
        }
      }

}