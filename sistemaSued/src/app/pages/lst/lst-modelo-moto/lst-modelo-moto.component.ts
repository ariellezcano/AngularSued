import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModeloMoto } from 'src/app/models/index.models';
import { ModeloMotoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilModeloMotoComponent } from '../../filters/fil-modelo-moto/fil-modelo-moto.component';

@Component({
  selector: 'app-lst-modelo-moto',
  templateUrl: './lst-modelo-moto.component.html',
  styleUrls: ['./lst-modelo-moto.component.scss']
})
export class LstModeloMotoComponent implements OnInit {

  @ViewChild(FilModeloMotoComponent, { static: false }) fil!: FilModeloMotoComponent;

  item!: ModeloMoto;

  items: ModeloMoto[];
  user: any;

  constructor(private wsdl: ModeloMotoService, private router: Router) {
    this.item = new ModeloMoto();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: ModeloMoto[]) {
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

  valorRol(item: any) {
    item = item;
    if (item == null) {
      this.user = 'Sin asignar';
    }
    return this.user;
  }

  linkear(id?: Number) {
    this.router.navigateByUrl('lst-modelosMoto/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
