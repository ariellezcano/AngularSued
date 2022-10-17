export class ArticuloContravencion {
    id!: number;
    contravencion!: number;
    articulo!: number;
    inciso!: string;
    descripcion!: string;

    contravencionNavigation: any;
    constructor(){

    }
}
