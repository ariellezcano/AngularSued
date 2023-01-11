import { PrevInculpado } from '../prev-inculpado';
import { PrevVictima } from '../prev-victima';
import { Preventivo } from '../preventivo';

export class Dnpc {
  codDel!: any;
  lstDel: Preventivo[];
  lstDelVict: PrevVictima[];
  lstDelInc: PrevInculpado[];
  nombre!: string;
  intervenPol: number = 0;
  denunciaPart: number = 0;

  masculino: number = 0;
  femenino: number = 0;
  noConsta: number = 0;
  
  constructor() {
    this.lstDel = [];
    this.lstDelVict = [];
    this.lstDelInc = [];
  }
}

export class ModelPrevPlanilla {
  //Preventivo
  codigo: any;
  departamento!: string;
  dnpc!: Dnpc[];
  totalRegistros!: number;
  totalIntervencion: any;
  totalDenParticular: any;
  //victimas
  totalVictMasc: any;
  totalVcitFem: any;
  totalVictNoConsta: any;
  //Inculpados
  totalInc: any;
  totalDet: any;
  constructor() {
  }
}
