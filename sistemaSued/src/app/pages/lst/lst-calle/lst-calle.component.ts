import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Calle } from 'src/app/models/index.models';
import { CalleService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilCalleComponent } from '../../filters/fil-calle/fil-calle.component';

@Component({
  selector: 'app-lst-calle',
  templateUrl: './lst-calle.component.html',
  styleUrls: ['./lst-calle.component.scss']
})
export class LstCalleComponent implements OnInit {

  @ViewChild(FilCalleComponent, { static: false }) fil!: FilCalleComponent;

  item!: Calle;

  items: Calle[];
  user: any;
  rol: string; 
  
  constructor(private wsdl: CalleService, private router: Router) {
    this.item = new Calle();
    this.items = [];
    this.rol = '';
  }

  ngOnInit(): void {
    this.rol = JSON.parse(''+ Utils.getSession('personal')).rol;
  }

  doFound(event: Calle[]) {
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
    this.router.navigateByUrl('lst-calle/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
