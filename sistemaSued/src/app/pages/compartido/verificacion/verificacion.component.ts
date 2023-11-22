import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroUsuarioService, UsuariosSuedService } from 'src/app/services/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.scss']
})
export class VerificacionComponent implements OnInit {

  public proccess: Boolean;
  id: any;
  datosPersonal!: any;
  nombre!: string;
  apellido!: string;
  item!: any;
  rol: any;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private wsdl: RegistroUsuarioService,
    private _router: ActivatedRoute,
    private wsdlUsuarioSued: UsuariosSuedService
  ) {
    this.proccess = true;
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.login2();
  }

  async login2() {
    let nuevocifrado = this.id.replace("Pol_Repo", "");

    try {
      let data = await this.wsdlUsuarioSued.doLoginId(nuevocifrado).then();

      let res = JSON.parse(JSON.stringify(data));

      if (res.code == 200) {
        this.proccess = false;
        ////console.log('registro usuario login 2', res.code);
        this.item = res.data;
        ////console.log('item', this.item)
        if (!this.item.baja && this.item.activo) {
          ////console.log("baja verificar", this.item.baja)
          this.apellido = res.data.datosPersonal.apellido;
          this.nombre = res.data.datosPersonal.nombre;
          this.rol = res.data.datosPersonal.rol;
          this.datosPersonal = {
            apellido: this.apellido,
            nombre: this.nombre,
            rol: this.rol,
          };
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
          Toast.fire({
            icon: 'success',
            title: 'Bienvenido Sr/a: ' + res.data.datosPersonal.apellido,
          });
          UturuncoUtils.setSession('user', JSON.stringify(res.data.id));
          UturuncoUtils.setSession(
            'personal',
            JSON.stringify(this.datosPersonal)
          );
          this.route.navigate(['/dashboard']);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Alerta...',
            text: 'Usuario dado de baja, contáctese con el administrador del sistema!',
          });
        }
      } else if (res.code == 401) {
        Swal.fire(
          'Usuario no habilitado',
          'Por favor contáctese con el administrador del sistema para generar su usuario',
          'info'
        );
      } else if (res.code == 204) {
        Swal.fire('fallo de vinculacion', ' se redirecciono al login', 'error');
        this.route.navigate(['']);
      }
      this.proccess = false;
    } catch (error) {
      Swal.fire('Oops...', 'Algo salio mal vuelva a intentar ', 'error');
      this.proccess = false;
    }
  }

}
