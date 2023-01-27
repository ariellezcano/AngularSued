import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculoMarca } from 'src/app/models/index.models';
import { VehiculoMarcaService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilVehiculoMarcaComponent } from '../../filters/fil-vehiculo-marca/fil-vehiculo-marca.component';

@Component({
  selector: 'app-lst-vehiculo-marca',
  templateUrl: './lst-vehiculo-marca.component.html',
  styleUrls: ['./lst-vehiculo-marca.component.scss']
})
export class LstVehiculoMarcaComponent implements OnInit {

  @ViewChild(FilVehiculoMarcaComponent, { static: false }) fil!: FilVehiculoMarcaComponent;

  item!: VehiculoMarca;

  items: VehiculoMarca[];
  user: any;
  rol: any;
  constructor(private wsdl: VehiculoMarcaService, private router: Router) {
    this.item = new VehiculoMarca();
    this.items = [];
    this.rol = '';
  }

  ngOnInit(): void {
    this.rol = JSON.parse(''+ Utils.getSession('personal')).rol;
  }

  doFound(event: VehiculoMarca[]) {
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
    this.router.navigateByUrl('lst-marcasVehiculos/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
