export class Localidad {
    id!: number;
    codigo!: string;
    nombre!: string;
    departamento!: number;
    provincia!: number;
    nacion!: number;
    codPostal!: string;
    codProv: any;
    codDto!: string;
    codLoc!: string;


    provinciaNavigation: any;
    dptoNavigation: any;
    nacionNavigation: any;

    constructor(){}
}