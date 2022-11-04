export class Rol {
    id!: number;
    nombre: String | undefined;
    activo: boolean
    created_at: any;
    updated_at: any;
    deleted_at: any;

    constructor() {
        this.activo = true;
    }
}