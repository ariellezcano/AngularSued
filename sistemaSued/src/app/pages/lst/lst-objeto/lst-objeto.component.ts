import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Objeto } from 'src/app/models/index.models';
import { ObjetoService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilObjetoComponent } from '../../filters/fil-objeto/fil-objeto.component';

@Component({
  selector: 'app-lst-objeto',
  templateUrl: './lst-objeto.component.html',
  styleUrls: ['./lst-objeto.component.scss']
})
export class LstObjetoComponent implements OnInit {

  @ViewChild(FilObjetoComponent, { static: false }) fil!: FilObjetoComponent;

  item!: Objeto;

  items: Objeto[];
  user: any;
  rol: string; 
  constructor(private wsdl: ObjetoService, private router: Router) {
    this.item = new Objeto();
    this.items = [];
    this.rol = '';
  }

  ngOnInit(): void {
    this.rol = JSON.parse(''+ Utils.getSession('personal')).rol;
  }

  doFound(event: Objeto[]) {
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
    this.router.navigateByUrl('lst-objeto/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
