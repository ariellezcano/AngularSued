import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MarcaMoto } from 'src/app/models/index.models';
import { MarcaMotoService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilMarcaMotoComponent } from '../../filters/fil-marca-moto/fil-marca-moto.component';

@Component({
  selector: 'app-lst-marca-moto',
  templateUrl: './lst-marca-moto.component.html',
  styleUrls: ['./lst-marca-moto.component.scss']
})
export class LstMarcaMotoComponent implements OnInit {

  @ViewChild(FilMarcaMotoComponent, { static: false }) fil!: FilMarcaMotoComponent;

  item!: MarcaMoto;

  items: MarcaMoto[];
  user: any;
  rol: any;

  constructor(private wsdl: MarcaMotoService, private router: Router) {
    this.item = new MarcaMoto();
    this.items = [];
    this.rol = '';
  }

  ngOnInit(): void {
    this.rol = JSON.parse(''+ Utils.getSession('personal')).rol;
  }

  doFound(event: MarcaMoto[]) {
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
    this.router.navigateByUrl('lst-marcasMoto/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
