import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IdentidadGenero } from 'src/app/models/index.models';
import { IdentidadGeneroService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilIdentidadGeneroComponent } from '../../filters/fil-identidad-genero/fil-identidad-genero.component';

@Component({
  selector: 'app-lst-identidad-genero',
  templateUrl: './lst-identidad-genero.component.html',
  styleUrls: ['./lst-identidad-genero.component.scss']
})
export class LstIdentidadGeneroComponent implements OnInit {

  @ViewChild(FilIdentidadGeneroComponent, { static: false }) fil!: FilIdentidadGeneroComponent;

  item!: IdentidadGenero;

  items: IdentidadGenero[];
  user: any;

  constructor(private wsdl: IdentidadGeneroService, private router: Router) {
    this.item = new IdentidadGenero();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: IdentidadGenero[]) {
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
    this.router.navigateByUrl('lst-identidadGenero/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
