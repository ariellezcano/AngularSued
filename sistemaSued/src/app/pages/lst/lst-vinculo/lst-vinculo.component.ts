import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Vinculo } from 'src/app/models/index.models';
import { VinculoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilVinculoComponent } from '../../filters/fil-vinculo/fil-vinculo.component';

@Component({
  selector: 'app-lst-vinculo',
  templateUrl: './lst-vinculo.component.html',
  styleUrls: ['./lst-vinculo.component.scss']
})
export class LstVinculoComponent implements OnInit {

  @ViewChild(FilVinculoComponent, { static: false }) fil!: FilVinculoComponent;

  item!: Vinculo;

  items: Vinculo[];
  user: any;

  constructor(private wsdl: VinculoService, private router: Router) {
    this.item = new Vinculo();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: Vinculo[]) {
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
    this.router.navigateByUrl('lst-vinculo/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }


}
