export class PrevSnicSuicidio {
    id!: number;
    preventivo!: number;
    armaFuego: boolean;
    armaBlElcontundente: boolean;
    sumersion: boolean;
    envenenamiento: boolean;
    ahorcamiento: boolean;
    seArroja: boolean;
    seArrojaVia: boolean;
    seIncinera: boolean;
    sinDeterminarModalidad: boolean
    otraModalidad: boolean;
    especificarModalidad: string | undefined | null;
    viaPublica: boolean;
    domParticular: boolean;
    viaFerroCarril: boolean;
    carcelComisaria: boolean;
    otroLugar: boolean;
    especifLugar!: string | undefined | null;
    sinDeterminarLugar: boolean;

    constructor(){
        this.armaFuego = false;
        this.armaBlElcontundente = false;
        this.sumersion = false;
        this.envenenamiento = false;
        this.ahorcamiento = false;
        this.seArroja = false;
        this.seArrojaVia = false;
        this.seIncinera = false;
        this.sinDeterminarModalidad = false;
        this.otraModalidad = false;
        this.viaPublica = false;
        this.domParticular = false;
        this.viaFerroCarril = false;
        this.carcelComisaria = false;
        this.otroLugar = false;
        this.sinDeterminarLugar = false;
    }
}
