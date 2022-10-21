import { IfStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Unidad, UnidadesSued } from 'src/app/models/index.models';
import { UnidadesSuedService, UnidadService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilUnidadesComponent } from '../../filters/fil-unidades/fil-unidades.component';

@Component({
  selector: 'app-lst-unidades',
  templateUrl: './lst-unidades.component.html',
  styleUrls: ['./lst-unidades.component.scss']
})
export class LstUnidadesComponent implements OnInit {

  @ViewChild(FilUnidadesComponent, { static: false }) fil!: FilUnidadesComponent;

  item!: UnidadesSued;

  items: UnidadesSued[];

  user: any;

  constructor(private wsdl: UnidadesSuedService, private router: Router) {
    this.item = new UnidadesSued();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: UnidadesSued[]) {
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
    this.router.navigateByUrl('lst-unidades/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }
}
