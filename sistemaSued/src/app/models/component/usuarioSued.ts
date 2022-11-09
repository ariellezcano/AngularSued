import { UnidadSistema } from './unidad-sistema';

export class UsuarioSued {
  id!: number;
  userCreaRepo!: number; /***dato del repo */
  usuarioRepo: any;
  fechaAlta: any;
  persona!: number;
  civil!: number;
  norDni: string | undefined;
  nombre: string | undefined;
  apellido: string | undefined;
  tipoPersona!: boolean; /*TRUE POLICIA   FALSE CIVIL*/
  fechaBaja: any;
  usuarioBaja: any;
  baja: boolean; /**baja de usuario del sistema bancaria por defecto false */
  activo: boolean; /**para que el usuario desactive temporalmente su usuario desde el repo */
  sistema!: UnidadSistema; /*id de unidad*/
  cifrado: any; /*PARA INGRESAR DESDE EL REPO*/
  fechaVinculacion: any; /*fecha de control para el ingreso*/
  rol: any;

  // created_at: any;
  // updated_at: any;
  // deleted_at: any;

  rolNavigation: any;
  constructor() {
    this.baja = false;
    this.activo = true;
  }
}
