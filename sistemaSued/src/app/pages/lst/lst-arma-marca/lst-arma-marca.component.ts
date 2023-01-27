import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ArmaMarca } from 'src/app/models/index.models';
import { ArmaMarcaService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilArmaMarcaComponent } from '../../filters/fil-arma-marca/fil-arma-marca.component';

@Component({
  selector: 'app-lst-arma-marca',
  templateUrl: './lst-arma-marca.component.html',
  styleUrls: ['./lst-arma-marca.component.scss']
})
export class LstArmaMarcaComponent implements OnInit {

  @ViewChild(FilArmaMarcaComponent, { static: false }) fil!: FilArmaMarcaComponent;

  item!: ArmaMarca;

  items: ArmaMarca[];
  user: any;
  rol: any;
  constructor(private wsdl: ArmaMarcaService, private router: Router) {
    this.item = new ArmaMarca();
    this.items = [];
    this.rol = '';
  }

  ngOnInit(): void {
    this.rol = JSON.parse(''+ Utils.getSession('personal')).rol;
  }

  doFound(event: ArmaMarca[]) {
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
    this.router.navigateByUrl('lst-marcas/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }


}
