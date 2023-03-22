export class PrevVictima {
    id!: number;
    preventivo!: number;
    sexo!: number;
    edad!: number;
    nacionalidad!: number;
    estudios!: number;
    ocupacion!: number;
    nombre!: string;
    apellido!: string;
    dni!: number;
    fallecio!: boolean;
    provincia!: number;
    genero!: number;
    calle!: number;
    dirNro!: number;
    dirAdicional!: string;
    barrio!: number;
    dnpcClase!: string;
    dnpcVehiculo!: string;

    nacionNavigation: any;
    estudioNavigation: any;
    ocupacionNavigation: any;
    sexoNavigation: any;
    identidadNavigation: any;
    calleNavigation: any;
    barrioNavigation: any;
    provinciaNavigation: any;

    capturaSexo: any;
    capturaNacionalidad: any;
    capturaEstudio: any;
    capturaOcupacion: any;
    capturaGenero: any;
    capturaProvincia: any;
    
    constructor(){

    }
}
