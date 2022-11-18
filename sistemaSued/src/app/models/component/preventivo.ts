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
    unidadEspecial!: number;
    especificarLugar!: string;
    nivelEducativo!: string;
    usuarioCrea!: number;
    fechaCreacion: any;
    usuarioBaja!: number;
    activo: boolean;


    lugarNavigation: any;
    calleNavigation: any;
    barrioNavigation: any;
    delitoNavigation: any;
    localidadNavigation: any;
    unidadNavigation: any;
    unidadEspecialNavigation: any


    nombreUnidad: string;
    nombreUniEspecial: string;
    localidadCoordenada: any;
    cp: any;
    pais: any;
    
    constructor(){
        this.activo = true;
        this.nombreUnidad = '';
        this.nombreUniEspecial = '';
    }
}
