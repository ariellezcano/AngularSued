export class PrevSnic {
  id!: number;
  preventivo!: number;
  //LUGAR
  urbano: boolean;
  subUrbano: boolean;
  rural: boolean;

  calle: boolean;
  rutaNacional: boolean;
  rutaProvincial: boolean;
  autopistaNacional: boolean;
  autopistaProvincial: boolean;
  autovia: boolean;
  sinDeterminarLugar: boolean;
  //Horario
  diurno: boolean;
  nocturno: boolean;
  //Victimas
  leves!: number;
  graves!: number;
  fallecidos!: number;
  //Vehículos Intervinientes (Indicar cantidad)
  particulares!: number;
  carga!: number;
  pasajeros!: number;
  otros!: number;
  //Modo Producción del Hecho
  vehiculoPeaton: boolean;
  motoBici: boolean;
  vehiculoTsangre: boolean;
  multiple: boolean;
  vehiculoVehiculo: boolean;
  bicicleta: boolean;
  motoMoto: boolean;
  tren: boolean;
  vehiculoObjeto: boolean;
  vehiculo: boolean;
  motoTsangre: boolean;
  atropelloAnimal: boolean;
  vehiculoBici: boolean;
  vehiculoMoto: boolean;
  motoPeaton: boolean;
  otroModo: boolean;
  sinDetModoProduccion: boolean;
  modoEspecificar: string | null | undefined;
  vuelcoDespiste: boolean;
  //Tipo de Hecho
  colision: boolean;
  vuelco: boolean;
  inmersion: boolean;
  incendio: boolean;
  caidaOcupante: boolean;
  otroTh: boolean; //ocupado TIPO DE HECHO
  //ignoraTh: boolean;
  //Ubicacion de la calzada
  dentroCalzada: boolean;
  fueraCalzada: boolean;
  ignoraCalzada: boolean;

  //condiciones climaticas
  climaNormal: boolean;
  niebla: boolean;
  lluvia: boolean;
  llovizna: boolean;
  nieve: boolean;
  granizo: boolean;
  nublado: boolean;
  otraCondicion: boolean;
  sinDeterminarCondicion: boolean;

  //Interseccion
  interseccion: boolean;
  //Semaforo
  funcionaB: boolean;
  noFunciona: boolean;
  noHaySemaforo: boolean;
  semaforoIntermitente: boolean;
  sinDeterminarSemaforo: boolean;

  constructor() {
    this.urbano = false;
    this.subUrbano = false;
    this.rural = false;
    this.diurno = false;
    this.nocturno = false;
    this.vehiculoPeaton = false;
    this.motoBici = false;
    this.vehiculoTsangre = false;
    this.multiple = false;
    this.vehiculoVehiculo = false;
    this.vuelcoDespiste = false;
    this.bicicleta = false;
    this.motoMoto = false;
    this.tren = false;
    this.vehiculoObjeto = false;
    this.vehiculo = false;
    this.motoTsangre = false;
    this.atropelloAnimal = false;
    this.vehiculoBici = false;
    this.vehiculoMoto = false;
    this.motoPeaton = false;
    this.otroModo = false;
    this.sinDetModoProduccion = false;
    this.colision = false;
    this.vuelco = false;
    this.inmersion = false;
    this.incendio = false;
    this.caidaOcupante = false;
    this.otroTh = false;
    //this.ignoraTh = false;
    this.dentroCalzada = false;
    this.fueraCalzada = false;
    this.ignoraCalzada = false;
    this.climaNormal = false;
    this.niebla = false;
    this.lluvia = false;
    this.llovizna = false;
    this.nieve = false;
    this.granizo = false;
    this.nublado = false;
    this.otraCondicion = false;
    this.sinDeterminarCondicion = false;
    this.interseccion = false;

    this.funcionaB = false;
    this.noFunciona = false;
    this.noHaySemaforo = false;
    this.semaforoIntermitente = false;
    this.sinDeterminarSemaforo = false;

    this.calle = false;
    this.rutaNacional = false;
    this.rutaProvincial = false;
    this.autopistaNacional = false;
    this.autopistaProvincial = false;
    this.autovia = false;
    this.sinDeterminarLugar = false;
  }
}
