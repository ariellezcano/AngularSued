import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TipoMoneda } from 'src/app/models/index.models';
import { TipoMonedaService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilTipoMonedaComponent } from '../../filters/fil-tipo-moneda/fil-tipo-moneda.component';

@Component({
  selector: 'app-lst-tipo-moneda',
  templateUrl: './lst-tipo-moneda.component.html',
  styleUrls: ['./lst-tipo-moneda.component.scss']
})
export class LstTipoMonedaComponent implements OnInit {

  @ViewChild(FilTipoMonedaComponent, { static: false }) fil!: FilTipoMonedaComponent;

  item!: TipoMoneda;

  items: TipoMoneda[];
  user: any;
  rol: any;
  constructor(private wsdl: TipoMonedaService, private router: Router) {
    this.item = new TipoMoneda();
    this.items = [];
    this.rol = '';
  }

  ngOnInit(): void {
    this.rol = JSON.parse(''+ Utils.getSession('personal')).rol;
  }

  doFound(event: TipoMoneda[]) {
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
    this.router.navigateByUrl('lst-tipoMoneda/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
