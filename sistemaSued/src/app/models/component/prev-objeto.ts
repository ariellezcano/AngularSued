export class PrevObjeto {
    id!: number;
    preventivo!: number;
    objeto!: number;
    cantidad!: number;
    secuestro: boolean;
    valor: any;
    cantSecuestro!: number;
    fecha: any;
    //activo!: boolean;

    objetoNavigation: any
    
    capturaObj!: string;
    codigo!: string;
    constructor(){
        this.secuestro = false;
    }
}
