export class PreventivoMedio {
    id!: number;
    preventivo!: number;
    medioUtilizado!: number;
    secuestro: boolean;
    fecha: any;
    //activo!: boolean;
    //calibre!: string;
    //serie!: string;

    medioNavigation: any;
    //armaNavigation: any;
    //usados para vista
    capturaDescripcion: any;
    codigo: any;
    tipoArma: any;
    
    constructor(){
        this.secuestro = false;
    }
}
