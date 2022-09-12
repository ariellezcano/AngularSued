import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ocupacion } from 'src/app/models/index.models';
import { OcupacionService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilOcupacionComponent } from '../../filters/fil-ocupacion/fil-ocupacion.component';

@Component({
  selector: 'app-lst-ocupacion',
  templateUrl: './lst-ocupacion.component.html',
  styleUrls: ['./lst-ocupacion.component.scss']
})
export class LstOcupacionComponent implements OnInit {

  @ViewChild(FilOcupacionComponent, { static: false }) fil!: FilOcupacionComponent;

  item!: Ocupacion;

  items: Ocupacion[];
  user: any;

  constructor(private wsdl: OcupacionService, private router: Router) {
    this.item = new Ocupacion();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: Ocupacion[]) {
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
    this.router.navigateByUrl('lst-ocupacion/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
