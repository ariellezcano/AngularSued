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
    persClase!: string;
    especifClaseInc!: string;
    genero!: number;
    especifGeneroInc!: string;
    provDetencion!: number;
    dirCalle!: number;
    direccionNro!: number;
    dirBarrio!: number;
    domDirAdicional!: string;
    dnpcVehiculo!: string;

    nacionalidadNavigation: any;
    sexoNavigation: any;
    estudiosNavigation: any;
    vinculoNavigation: any;
    calleNavigation: any;
    ocupacionNavigation: any;
    localidadNavigation: any;
    provinciaNavigation: any;
    identidadNavigation: any;
    provinciaDetNavigation: any;
    dirCalleNavigation: any;
    barrioNavigation: any;
    

    capturaSexo: any;
    capturaNacionalidad: any;
    capturaEstudio: any;
    capturaOcupacion: any;
    capturaVinculo: any;
    capturaCalle: any;
    capturaLocalidad: any;
    capturaProvincia: any;
    capturadirCalle: any;
    capturaBarrio: any;
    
    constructor(){
        this.detenido = false;
    }
}
