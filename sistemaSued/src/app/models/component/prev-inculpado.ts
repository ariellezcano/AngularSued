export class PrevInculpado {
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
    vinculo!: number;
    detenido: boolean;
    fechaDetencion!: any;
    alias!: string;
    prontGabinete!: string;
    prontNro!: string;
    calle!: number;
    dirNro!: number;
    dirAdic!: string;
    localidad!: number;
    provincia!: number;
    persClase!: number;


    nacionalidadNavigation: any;
    sexoNavigation: any;
    estudiosNavigation: any;
    vinculoNavigation: any;
    calleNavigation: any;
    ocupacionNavigation: any;
    localidadNavigation: any;
    provinciaNavigation: any;


    capturaSexo: any;
    capturaNacionalidad: any;
    capturaEstudio: any;
    capturaOcupacion: any;
    capturaVinculo: any;
    capturaCalle: any;
    capturaLocalidad: any;
    capturaProvincia: any;
    
    constructor(){
        this.detenido = false;
    }
}
