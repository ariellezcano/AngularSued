import { Time } from "@angular/common";

export class Preventivo {
    id!: number;
    fechaPreventivo: any;
    unidad!: number;
    delito!: number;
    fechaHecho: any;
    hora: any;
    lugar!: number;
    calle!: number;
    dirNro!: number;
    dirAdic!: string;
    barrio!: number;
    localidad!: number;
    latitud!: string;
    longitud!: string;
    anio!: number;
    nro!: number;
    letra!: string;
    intervencionPol!: boolean;
    fechaBaja: any;
    activo: boolean;


    lugarNavigation: any;
    calleNavigation: any;
    barrioNavigation: any;
    delitoNavigation: any;
    localidadNavigation: any;


    localidadCoordenada: any;
    cp: any;
    pais: any;
    
    constructor(){
        this.activo = true;
    }
}
