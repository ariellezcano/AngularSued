import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioSued } from 'src/app/models/index.models';
import { RegistroUsuarioService, UsuariosSuedService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FiUsuariosSuedComponent } from '../../filters/fi-usuarios-sued/fi-usuarios-sued.component';

@Component({
  selector: 'app-lst-usuarios',
  templateUrl: './lst-usuarios.component.html',
  styleUrls: ['./lst-usuarios.component.scss'],
})
export class LstUsuariosComponent implements OnInit {
  @ViewChild(FiUsuariosSuedComponent, { static: false })
  fil!: FiUsuariosSuedComponent;

  @ViewChild('close')
  cerrar!: ElementRef;

  exportar: boolean = false;
  items: UsuarioSued[];
  item: UsuarioSued;

  crit: any;
  procesando!: Boolean;
  public load!: boolean;

  public nombre: string = 'Estadistísticas Policiales (SUED)';
  public url: string = 'https://10.125.31.214/sued/';
  public activoSistema: boolean = false;

  TipoUsuario!: string;

  entidad = 'lst-usuarios';
  nombreUsu = '';
  //rol = '';

  constructor(
    private wsdl: UsuariosSuedService,
    private wsdlRegistro: RegistroUsuarioService,
    private router: Router
  ) {
    this.load = false;
    this.item = new UsuarioSued();
    this.items = [];
    //this.rol = "";
  }

  ngOnInit(): void {
    //this.rol = JSON.parse(''+ Utils.getSession('personal')).rol;
    this.nombreUsu = JSON.parse(
      '' + UturuncoUtils.getSession('personal')
    ).nombre;
  }

  preDelete(item: UsuarioSued) {
    this.item = new UsuarioSued();
    this.item = item;

    Swal.fire({
      title: 'Está Seguro?',
      text: '¡Deberá volver a habilitar el usuario si lo necesita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Inhabilitar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.delete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        UturuncoUtils.showToas('Operacion cancelada', 'warning');
      }
    });
  }

  async delete() {
    try {
      this.procesando = true;
      this.item.baja = true;
      this.item.usuarioBaja = Number(UturuncoUtils.getSession('user'));
      console.log('usuario', this.item);
      const res = await this.wsdl.doUpdateBaja(this.item.id, this.item).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.code == 200) {
        try {
          let data = await this.wsdlRegistro
            .patchSistemaHabilitados(
              this.item.usuarioRepo,
              this.nombre,
              this.url,
              this.activoSistema
            )
            .then();
          let res = JSON.parse(JSON.stringify(data));
          console.log('resultadoasa', result);
          if (res.code == 200) {
            console.log('Personal inhabilitado');
          }
        } catch (error) {
          console.log('respuestaerror', error);
        }
        UturuncoUtils.showToas('Usuario inhabilitado correctamente!', 'success');
        this.cancel();
      } else {
        UturuncoUtils.showToas('Error al inhabilitar el usuario', 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
    this.procesando = false;
  }

  cancel() {
    this.item = new UsuarioSued();
    this.fil.filter();
  }

  async setResultCancel(event: Boolean) {
    UturuncoUtils.showToas('Operación cancelada', 'info');
  }

  setResult(event: any) {
    this.cancel();
  }

  evento(event: Boolean) {
    UturuncoUtils.showToas('Se creo correctamente', 'success');
    this.cerrar.nativeElement.click();
    //this.fil.list();
  }

  linkear(id?: Number) {
    this.router.navigateByUrl(this.entidad + '/abm/' + id);
  }

  habilitar() {
    this.router.navigateByUrl('/busqueda-usuario/abm');
  }


 public doFound(event: UsuarioSued[]) {
  this.items = event;
  }

  datoVista() {
    let bandera = false;
    if (this.crit != "" && this.crit != undefined) {
      this.items.forEach((element) => {
        if (element.norDni == this.crit) {
          this.crit="";
          bandera = true;
          this.items = [];
          this.items.push(element);
        }
      });
      if(!bandera){
        alert("No existe dato")
      }
    }else {
      this.fil.filter();
    }
  }

  tipoUsuario(item: any) {
    if (item) {
      this.TipoUsuario = 'Personal Policial';
    } else {
      this.TipoUsuario = 'Personal Civil';
    }
    return this.TipoUsuario;
  }
}
