import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Provincia } from 'src/app/models/index.models';
import { ProvinciaService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilProvinciaComponent } from '../../filters/fil-provincia/fil-provincia.component';

@Component({
  selector: 'app-lst-provincia',
  templateUrl: './lst-provincia.component.html',
  styleUrls: ['./lst-provincia.component.scss']
})
export class LstProvinciaComponent implements OnInit {

  @ViewChild(FilProvinciaComponent, { static: false }) fil!: FilProvinciaComponent;

  item!: Provincia;

  items: Provincia[];
  user: any;

  constructor(private wsdl: ProvinciaService, private router: Router) {
    this.item = new Provincia();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: Provincia[]) {
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
    this.router.navigateByUrl('lst-provincia/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }


}
