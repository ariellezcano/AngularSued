import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Delito } from 'src/app/models/component/delito';
import { DelitoService } from 'src/app/services/component/delito.service';
import Swal from 'sweetalert2';
import { FilDelitoComponent } from '../../filters/fil-delito/fil-delito.component';

@Component({
  selector: 'app-lst-delito',
  templateUrl: './lst-delito.component.html',
  styleUrls: ['./lst-delito.component.scss']
})
export class LstDelitoComponent implements OnInit {

  
  @ViewChild(FilDelitoComponent, { static: false }) fil!: FilDelitoComponent;

  item!: Delito;

  items: Delito[];
  user: any;

  constructor(private wsdl: DelitoService, private router: Router) {
    this.item = new Delito();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: Delito[]) {
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
    this.router.navigateByUrl('lst-delito/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
