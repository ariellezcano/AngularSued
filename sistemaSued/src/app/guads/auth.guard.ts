import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UturuncoUtils } from '../utils/uturuncoUtils';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  aut: boolean;

  constructor(private router: Router) {
    this.aut = UturuncoUtils.autenticacion();
  }

  canActivate() {
    if (this.aut) {
      /**esta logeado */
      return true;
    } else {
      Swal.fire(
        'Se detecto que no esta autenticado !!!',
        'Inicie sesion para ingresar al sistema',
        'info'
      );

      this.router.navigate(['']);

      return false;
    }
  }
}
