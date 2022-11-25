export class Rol {
    id!: number;
    nombre: String | undefined;
    activo: boolean

    constructor() {
        this.activo = true;
    }
}