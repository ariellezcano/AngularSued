import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Localidad } from 'src/app/models/component/localidad';
import { LocalidadService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilLocalidadComponent } from '../../filters/fil-localidad/fil-localidad.component';

@Component({
  selector: 'app-lst-localidad',
  templateUrl: './lst-localidad.component.html',
  styleUrls: ['./lst-localidad.component.scss']
})
export class LstLocalidadComponent implements OnInit {

  @ViewChild(FilLocalidadComponent, { static: false }) fil!: FilLocalidadComponent;

  item!: Localidad;

  items: Localidad[];
  user: any;

  constructor(private wsdl: LocalidadService, private router: Router) {
    this.item = new Localidad();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: Localidad[]) {
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
    this.router.navigateByUrl('lst-localidad/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
