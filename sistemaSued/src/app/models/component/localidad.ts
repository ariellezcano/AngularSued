export class Localidad {
    id!: number;
    codigo!: number;
    nombre!: string;
    departamento!: number;
    provincia!: number;
    nacion!: number;
    codPostal!: string;
    codProv: any;
    codDto!: string;
    codNac!: string;

    provinciaNavigation: any;
    dptoNavigation: any;
    nacionNavigation: any;

    constructor(){}
}