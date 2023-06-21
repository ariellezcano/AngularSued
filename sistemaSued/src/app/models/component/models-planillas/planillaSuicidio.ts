export class PlanillaSuicidio {
    codigoDpto: number;
    codigoUnidad: number;
    codigoLocalidad: number;
    nroPreventivo: number;
    fechaHecho: string;
    horaHecho: string;
    

        public int? nroPreventivo { get; }
        public DateTime? fechaHecho { get; }
        public string? horaHecho { get; }
        public Boolean? viaPublica { get; }
        public Boolean? domParticular { get; }
        public Boolean? viaTren { get; }
        public Boolean? carcelComisaria { get; }
        public Boolean? otroLugar { get; }
        public string? otroLugarEsp { get; }
        public Boolean? armaFuego { get; }
        public Boolean? armaElementoContundente { get; }
        public Boolean? sumersion { get; }
        public Boolean? envenenamiento { get; }
        public Boolean? ahorcamiento { get; }
        public Boolean? seArroja { get; }
        public Boolean? seArrojaVia { get; }
        public Boolean? otraModalidad { get; }
        public string? especificarModalidad { get; }
        public Boolean? intervencionPolicial { get; }
        public int? codigoSexo { get; }
        public int? edadVictima { get; }
        public int? generoVictima { get; }
        public string? especifGeneroVict { get; }
}