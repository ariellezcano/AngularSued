import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Sexo } from 'src/app/models/index.models';
import { SexoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilSexoComponent } from '../../filters/fil-sexo/fil-sexo.component';

@Component({
  selector: 'app-lst-sexo',
  templateUrl: './lst-sexo.component.html',
  styleUrls: ['./lst-sexo.component.scss']
})
export class LstSexoComponent implements OnInit {
  @ViewChild(FilSexoComponent, { static: false }) fil!: FilSexoComponent;

  item!: Sexo;

  items: Sexo[];
  user: any;

  constructor(private wsdl: SexoService, private router: Router) {
    this.item = new Sexo();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: Sexo[]) {
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
    this.router.navigateByUrl('lst-sexo/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }


}
