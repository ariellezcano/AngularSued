export class PreventivoMedio {
    id!: number;
    preventivo!: number;
    medioUtilizado!: number;
    secuestro: boolean;
    fecha: any;

    medioNavigation: any;
    //usados para vista
    capturaDescripcion: any;
    codigo: any
    constructor(){
        this.secuestro = false;
    }
}
