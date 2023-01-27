import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Contravencion } from 'src/app/models/index.models';
import { ContravencionService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilContravencionComponent } from '../../filters/fil-contravencion/fil-contravencion.component';

@Component({
  selector: 'app-lst-contravencion',
  templateUrl: './lst-contravencion.component.html',
  styleUrls: ['./lst-contravencion.component.scss']
})
export class LstContravencionComponent implements OnInit {

  @ViewChild(FilContravencionComponent, { static: false }) fil!: FilContravencionComponent;

  item!: Contravencion;

  items: Contravencion[];
  user: any;

  seleccionAccion: any;
  rol: any;

  constructor(private wsdl: ContravencionService, private router: Router) {
    this.item = new Contravencion();
    this.items = [];
    this.rol = '';
  }

  ngOnInit(): void {
    this.rol = JSON.parse(''+ Utils.getSession('personal')).rol;
  }

  doFound(event: Contravencion[]) {
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

  seleccion(id: any) {
    switch (this.seleccionAccion.length > 0) {
      case this.seleccionAccion == 'caratula':
        this.router.navigateByUrl('lst-contravencion/articulado/' + id);
        break;
      case this.seleccionAccion == 'snic':
        this.router.navigateByUrl('lst-contravencion/imputado/' + id);
        break;
    }
  }

  linkear(id?: Number) {
    this.router.navigateByUrl('lst-contravencion/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }
}
