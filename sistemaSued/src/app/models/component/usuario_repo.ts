import { Civil } from "./civil";
import { Persona } from "./persona";

export class Usuario_repo {
    id!: number; /**id del usuario en repo */
    usuario!: String;/**nombre del usuario */
    persona: Persona;
    civil: Civil;

    constructor() {
        this.persona = new Persona();
        this.civil = new Civil();
    }

}