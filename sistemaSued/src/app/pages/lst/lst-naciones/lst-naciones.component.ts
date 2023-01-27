import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Naciones } from 'src/app/models/index.models';
import { NacionesService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilNacionesComponent } from '../../filters/fil-naciones/fil-naciones.component';

@Component({
  selector: 'app-lst-naciones',
  templateUrl: './lst-naciones.component.html',
  styleUrls: ['./lst-naciones.component.scss']
})
export class LstNacionesComponent implements OnInit {

  @ViewChild(FilNacionesComponent, { static: false }) fil!: FilNacionesComponent;

  item!: Naciones;

  items: Naciones[];
  user: any;
  rol: any;
  constructor(private wsdl: NacionesService, private router: Router) {
    this.item = new Naciones();
    this.items = [];
    this.rol = '';
  }

  ngOnInit(): void {
    this.rol = JSON.parse(''+ Utils.getSession('personal')).rol;
  }

  doFound(event: Naciones[]) {
    this.items = event;
  }

  async eliminar(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Estás seguro?',
        text: 'El registro no se podra recuperar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          let data = await this.wsdl.doDelete(id).then();
          const result = JSON.parse(JSON.stringify(data));
          if (result.code == 200) {
            this.fil.filter();
            swalWithBootstrapButtons.fire(
              'Eliminado exitosamente!',
              'Tu registro ya no existe.',
              'success'
            );
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Su registro está seguro :)',
            'error'
          );
        }
      });
  }

  valorRol(item: any) {
    item = item;
    if (item == null) {
      this.user = 'Sin asignar';
    }
    return this.user;
  }

  linkear(id?: Number) {
    this.router.navigateByUrl('lst-naciones/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
