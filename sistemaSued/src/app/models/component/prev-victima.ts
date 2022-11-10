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
    autoPercepcion!: number;

    nacionNavigation: any;
    estudioNavigation: any;
    ocupacionNavigation: any;
    sexoNavigation: any;
    identidadNavigation: any;

    capturaSexo: any;
    capturaNacionalidad: any;
    capturaEstudio: any;
    capturaOcupacion: any;
    
    constructor(){

    }
}
