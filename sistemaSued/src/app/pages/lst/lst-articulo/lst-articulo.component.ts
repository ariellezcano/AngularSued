import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DelitoArt } from 'src/app/models/index.models';
import { ArticuloService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilArticuloComponent } from '../../filters/fil-articulo/fil-articulo.component';

@Component({
  selector: 'app-lst-articulo',
  templateUrl: './lst-articulo.component.html',
  styleUrls: ['./lst-articulo.component.scss']
})
export class LstArticuloComponent implements OnInit {

  @ViewChild(FilArticuloComponent, { static: false }) fil!: FilArticuloComponent;

  item!: DelitoArt;

  items: DelitoArt[];
  user: any;

  constructor(private wsdl: ArticuloService, private router: Router) {
    this.item = new DelitoArt();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: DelitoArt[]) {
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
    this.router.navigateByUrl('lst-articulo/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }
}
