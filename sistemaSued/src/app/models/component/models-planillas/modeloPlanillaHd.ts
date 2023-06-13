export class PlanillaHd{
    idDpto?: number;
    codigoDpto?: number
    nombreDpto?: string;
    idUnidad?: number;
    codigoUnidad?: number;
    nombreUnidad?: string;
    idLocalidad?: number;
    codigoLocalidad?: number;
    nombreLocalidad?: string;
    nroPreventivo?: number;
    delito?: number;
    descripcionDelito?: string;
    fechaHecho?: any;
    horaHecho?: string;
    nombreCalle!: string | null;
    alturaCalle?: number;
    dirAdicional!: string | null;
    interseccionCalle?: string;
    //tipoLugar
    viaPublica?: boolean;
    domParticular?: boolean;
    comercio?: boolean;
    interiorRodados?:boolean;
    carcelComisaria?: boolean;
    otroLugar?: boolean;
    otroLugarEsp?: boolean;
    //medio arma mecanica
    armaFuego?: boolean;
    armaBlanca?: boolean;
    otraArma?: boolean;
    otraArmaEsp?: string;
    sinArma?: boolean;
    //en ocacion de otro delito
    siRobo?: boolean;
    abusoSexual?: boolean;
    otroDelito?: boolean;
    otroDelitoEsp?: string;
    noOtroDelito?: boolean;

    interPolicial?: boolean;
    //coordenadas
    latitud?: string;
    longitud?: string;
    //observacionAmpliacion
    observacionAmpl?: string;
    //victima
    dniVctima?: number;
    nombreVictima?: string;
    apellidoVictima?: string;
    sexoVictima?: number;
    codigoSexo?: number;
    edadVictima?: number;
    descripcionSexo?: string;
    claseVictima?: string;
    especifClaseVic?: string;
    codigoOcupacion?: number;
    descripOcupacion?: string;
    especOcupacion?: string;
    codigoGenero?: number;
    genero?: string;
    especGenero?: string;
    //inculpado
    sexoGeneroInc?: number;
    codigoSexInculpado?: number;
    descripSexoInc?: string;
    edadInculpado?: number;
    claseInculpado?: string;
    especifClaseInc?: string;
    codigoVinculo?: number;
    descripcionVinculo?: string;
    codGeneroInculp?: number;
    especifGeneroInc?: string;
}