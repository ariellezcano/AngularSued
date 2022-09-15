import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModeloVehiculo } from 'src/app/models/index.models';
import { ModeloVehiculoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilModeloVehiculoComponent } from '../../filters/fil-modelo-vehiculo/fil-modelo-vehiculo.component';

@Component({
  selector: 'app-lst-modelo-vehiculo',
  templateUrl: './lst-modelo-vehiculo.component.html',
  styleUrls: ['./lst-modelo-vehiculo.component.scss']
})
export class LstModeloVehiculoComponent implements OnInit {

  @ViewChild(FilModeloVehiculoComponent, { static: false }) fil!: FilModeloVehiculoComponent;

  item!: ModeloVehiculo;

  items: ModeloVehiculo[];
  user: any;

  constructor(private wsdl: ModeloVehiculoService, private router: Router) {
    this.item = new ModeloVehiculo();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: ModeloVehiculo[]) {
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
    this.router.navigateByUrl('lst-modelos/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
