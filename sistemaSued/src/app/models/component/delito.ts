export class Delito {
    id!: number;
    codTitulo!: string;
    codCapitulo!: string;
    codTipo!: string;
    codSubTipo!: string;
    descripcion!: string;
    articulo!: string;
    dnpc!: number;
    imputable!: boolean;

    dnpcNavigation: any;

    constructor(){}
}
