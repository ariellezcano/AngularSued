import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/models/index.models';
import { DepartamentoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilDepartamentoComponent } from '../../filters/fil-departamento/fil-departamento.component';

@Component({
  selector: 'app-lst-departamento',
  templateUrl: './lst-departamento.component.html',
  styleUrls: ['./lst-departamento.component.scss']
})
export class LstDepartamentoComponent implements OnInit {

  @ViewChild(FilDepartamentoComponent, { static: false }) fil!: FilDepartamentoComponent;

  item!: Departamento;

  items: Departamento[];
  user: any;

  constructor(private wsdl: DepartamentoService, private router: Router) {
    this.item = new Departamento();
    this.items = [];
  }

  ngOnInit(): void {
  }

  doFound(event: Departamento[]) {
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
    this.router.navigateByUrl('lst-departamento/abm/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }
}
