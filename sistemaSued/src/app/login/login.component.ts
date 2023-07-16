import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioSued } from '../models/index.models';
import {
  RegistroUsuarioService,
  UsuariosSuedService,
} from '../services/index.service';
import { UturuncoUtils } from '../utils/uturuncoUtils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  id: number;

  userName: string;
  password: string;

  datosPersonal!: any;

  proccess: boolean;

  item: UsuarioSued;

  constructor(
    private wsdlRegistro: RegistroUsuarioService,
    private wsdlUsuarioSued: UsuariosSuedService,
    private route: Router,
    private route_: ActivatedRoute
  ) {
    this.userName = '';
    this.password = '';
    this.proccess = false;
    this.id = 0;
    this.item = new UsuarioSued();
  }

  ngOnInit(): void {
    this.userName = '';
    this.password = '';
  }

  async login() {
    try {
      if (this.userName != '' && this.password != '') {
        this.proccess = true;
        let data = await this.wsdlRegistro
          .getLogin(this.userName, this.password)
          .then();
        this.proccess = false;
        const res = JSON.parse(JSON.stringify(data));
        console.log('respuesta policia digital', res);
        if (res.code == 200) {
          //console.log("data login2", res)
          // this.route.navigate(['/principal']);
          this.id = res.data;
          this.login2();
        } else if (res.code == 204) {
          this.userName = '';
          this.password = '';
          Swal.fire({
            icon: 'error',
            title: 'Alerta...',
            text: 'Usted no se encuentra registrado en el Sistema RePO',
          });
        } else {
          Swal.fire('Alerta...', res.msg, 'error');
        }
      } else {
        Swal.fire('Alerta...', 'Ingrese datos validos', 'warning');
      }
    } catch (error) {
      this.proccess = false;
      Swal.fire('Oops...', '' + error, 'error');
    }
  }

  async login2() {
    try {
      this.proccess = true;
      let data = await this.wsdlUsuarioSued.getFindId(this.id).then();
      const res = JSON.parse(JSON.stringify(data));
      console.log('bdlocal', res);
      if (res.code == 200) {
        this.item = res.dato;
        if (!this.item.baja && this.item.activo) {
          this.datosPersonal = {
            apellido: this.item.apellido,
            nombre: this.item.nombre,
            rol: this.item.rolNavigation?.nombre,
          };
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
          Toast.fire({
            icon: 'success',
            title: 'Bienvenido Sr/a: ' + this.item.apellido,
          });
          UturuncoUtils.setSession('user', JSON.stringify(res.dato.id));
          UturuncoUtils.setSession(
            'personal',
            JSON.stringify(this.datosPersonal)
          );
          this.route.navigate(['/principal']);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Alerta...',
            text: 'Usuario dado de baja, contáctese con el administrador del sistema!',
          });
        }
      } else if (res.code == 401) {
        //alert(res.code);
        Swal.fire(
          'Usuario no habilitado',
          'Por favor contáctese con el administrador del sistema para generar su usuario',
          'info'
        );
      } else {
        Swal.fire('Oops...', res.msg, 'error');
      }
      this.proccess = false;
    } catch (error) {
      console.log(error);
      Swal.fire('Oops...', 'Algo salio mal vuelva a intentar ', 'error');
      this.proccess = false;
    }
  }
}
