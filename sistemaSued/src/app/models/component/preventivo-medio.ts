export class PreventivoMedio {
    id!: number;
    preventivo!: number;
    medioUtilizado!: number;
    secuestro: boolean;
    fecha: any;

    medioNavigation: any;
    constructor(){
        this.secuestro = false;
    }
}
