export class Delito {
    id!: number;
    codTitulo!: number;
    codCapitulo!: number;
    codTipo!: number;
    codSubTipo!: number;
    descripcion!: string;
    articulo!: string;
    dnpc!: number;
    imputable!: boolean;

    dnpcNavigation: any;

    constructor(){
        
    }
}
