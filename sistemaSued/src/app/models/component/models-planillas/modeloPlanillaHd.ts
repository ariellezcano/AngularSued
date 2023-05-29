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
    nombreCalle?: string;
    alturaCalle?: number;
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
    codigoOcupacion?: number;
    descripOcupacion?: string;
    codigoGenero?: number;
    genero?: string;
    //inculpado
    sexoGeneroInc?: number;
    codigoSexInculpado?: number;
    descripSexoInc?: string;
    edadInculpado?: number;
    claseInculpado?: string;
    codigoVinculo?: number;
    codGeneroInculp?: number;
    descripcionVinculo?: string;
}