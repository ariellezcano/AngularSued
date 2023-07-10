export class PrevSnicHomicidio {
  id!: number;
  preventivo!: number;
  viaPublica: boolean;
  domParticular: boolean;
  comercio: boolean;
  intRodados: boolean;
  carcelComisaria: boolean;
  otroLugar: boolean;
  sinDeterminarLugar: any;
  especifLugar: string | undefined | null;

  armaFuego: boolean;
  armaBlanca: boolean;
  otraArma: boolean;
  sinArma: boolean;
  especifArma: string | undefined | null;
  objetoContundente: any;
  arrollamiento: any;
  golpesPunio: any;
  ahorcamientoAsfixia: any;
  envenenamiento: any;
  precipitacionAlVacio: any;
  quemaduras: any;
  sinDeterminarMecanismo: any;
  
  robo: boolean;
  violacion: boolean;
  otroDel: boolean;
  noOtrodelito: boolean;
  especifDel!: string;
  sinDeterminarOcacionDelito: boolean;
  constructor() {
    this.viaPublica = false;
    this.domParticular = false;
    this.comercio = false;
    this.intRodados = false;
    this.carcelComisaria = false;
    this.otroLugar = false;
    this.armaFuego = false;
    this.armaBlanca = false;
    this.otraArma = false;
    this.sinArma = false;
    this.robo = false;
    this.violacion = false;
    this.otroDel = false;
    this.noOtrodelito = false;
    this.sinDeterminarOcacionDelito = false;
  }
}
