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
    calleInterseccion!:number;
    dirNro!: number;
    dirAdic!: string;
    barrio!: number;
    localidad!: number;
    latitud!: string;
    longitud!: string;
    anio!: number;
    nro!: number;
    letra!: string;
    intervencionPol: boolean;
    fechaBaja: any;
    especificarLugar!: string;
    nivelEducativo!: string;
    usuarioCrea: any;
    fechaCreacion: any;
    usuarioModifica: any;
    usuarioBaja: any;
    activo: boolean;


    lugarNavigation: any;
    calleNavigation: any;
    calleInterseccionNavigation: any;
    barrioNavigation: any;
    delitoNavigation: any;
    localidadNavigation: any;
    unidadNavigation: any;


    nombreUnidad: string;
    nombreUniEspecial: string;
    //localidad
    localidadCoordenada: any;
    cp: any;
    pais: any;
    //delito
    nombreDelito: any;
    nombreDnpc: any;

    constructor(){
        this.activo = true;
        this.nombreUnidad = '';
        this.nombreUniEspecial = '';
        this.intervencionPol = false;
    }
}
