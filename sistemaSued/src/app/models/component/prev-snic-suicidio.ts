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
    otraModalidad: boolean;
    especificarModalidad: string | undefined | null;
    viaPublica: boolean;
    domParticular: boolean;
    viaFerroCarril: boolean;
    carcelComisaria: boolean;
    otroLugar: boolean;
    especifLugar!: string;

    constructor(){
        this.armaFuego = false;
        this.armaBlElcontundente = false;
        this.sumersion = false;
        this.envenenamiento = false;
        this.ahorcamiento = false;
        this.seArroja = false;
        this.seArrojaVia = false;
        this.otraModalidad = false;
        this.viaPublica = false;
        this.domParticular = false;
        this.viaFerroCarril = false;
        this.carcelComisaria = false;
        this.otroLugar = false;
    }
}
