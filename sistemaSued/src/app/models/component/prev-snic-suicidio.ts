export class PrevSnicSuicidio {
    id!: number;
    preventivo!: number;
    armaFuego: boolean;
    armaBlanca: boolean;
    sumersion: boolean;
    envenenamiento: boolean;
    ahorcamiento: boolean;
    seArroja: boolean;
    seArrojaVia: boolean;
    otraModalidad: boolean;
    viaPublica: boolean;
    domParticular: boolean;
    viaFerroCarril: boolean;
    carcelComisaria: boolean;
    otroLugar: boolean;
    especifLugar!: string;

    constructor(){
        this.armaFuego = false;
        this.armaBlanca = false;
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
