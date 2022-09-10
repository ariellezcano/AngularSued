import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Lugar } from 'src/app/models/index.models';
import { LugarService } from 'src/app/services/component/lugar.service';
import Swal from 'sweetalert2';
import { FilLugarComponent } from '../../filters/fil-lugar/fil-lugar.component';

@Component({
  selector: 'app-lst-lugar',
  templateUrl: './lst-lugar.component.html',
  styleUrls: ['./lst-lugar.component.scss']
})
export class LstLugarComponent implements OnInit {

  @ViewChild(FilLugarComponent, { static: false }) fil!: FilLugarComponent;

  item!: Lugar;

  items: Lugar[];
  user: any;

  constructor(private wsdl: LugarService, private router: Router) {
    this.item = new Lugar();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: Lugar[]) {
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
    this.router.navigateByUrl('lst-lugar/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }
}
