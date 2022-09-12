import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Modalidad } from 'src/app/models/index.models';
import { ModalidadService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilModalidadComponent } from '../../filters/fil-modalidad/fil-modalidad.component';

@Component({
  selector: 'app-lst-modalidad',
  templateUrl: './lst-modalidad.component.html',
  styleUrls: ['./lst-modalidad.component.scss']
})
export class LstModalidadComponent implements OnInit {

  @ViewChild(FilModalidadComponent, { static: false }) fil!: FilModalidadComponent;

  item!: Modalidad;

  items: Modalidad[];
  user: any;

  constructor(private wsdl: ModalidadService, private router: Router) {
    this.item = new Modalidad();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: Modalidad[]) {
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

  linkear(id?: Number) {
    this.router.navigateByUrl('lst-modalidad/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
