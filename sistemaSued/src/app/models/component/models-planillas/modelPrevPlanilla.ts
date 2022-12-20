import { Preventivo } from '../preventivo';

export class Dnpc {
  codDel!: any;
  lstDel: Preventivo[];
  nombre!: string;
  intervenPol: number = 0;
  denunciaPart: number = 0;
  
  
  constructor() {
    this.lstDel = [];

  }
}

export class ModelPrevPlanilla {
  codigo: any;
  departamento!: string;
  dnpc!: Dnpc[];
  totalRegistros!: number;
  totalIntervencion: any;
  totalDenParticular: any;

  constructor() {
  }
}
