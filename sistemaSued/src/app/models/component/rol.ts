export class Rol {
    id!: number;
    nombre: string | undefined;
    activo: boolean

    constructor() {
        this.activo = true;
    }
}