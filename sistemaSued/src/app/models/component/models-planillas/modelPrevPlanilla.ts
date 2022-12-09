import { Preventivo } from '../preventivo';

export class Dnpc {
  codDel!: any;
  lstDel: Preventivo[];
  nombre!: string;

  constructor() {
    this.lstDel = [];
  }
}

export class ModelPrevPlanilla {
  codigo: any;
  departamento!: string;
  dnpc!: Dnpc[];
  totalRegistros!: number;

  constructor() {
  }
}
