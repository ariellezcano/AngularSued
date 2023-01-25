import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Preventivo } from 'src/app/models/index.models';
import { PreventivoService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilPreventivoComponent } from '../../filters/fil-preventivo/fil-preventivo.component';

@Component({
  selector: 'app-lst-preventivo',
  templateUrl: './lst-preventivo.component.html',
  styleUrls: ['./lst-preventivo.component.scss'],
})
export class LstPreventivoComponent implements OnInit {
  @ViewChild(FilPreventivoComponent, { static: false })
  fil!: FilPreventivoComponent;

  seleccionAccion: any;

  @Output()
  id: number;

  proccess: boolean;
  selectedRowIndex: number = -1;

  item!: Preventivo;
  items: Preventivo[];
  
  rol: string; 
  user: any;

  constructor(private wsdl: PreventivoService, private router: Router) {
    this.rol = '';
    this.item = new Preventivo();
    this.items = [];
    this.proccess = false;
    this.id = 0;
  }

  ngOnInit(): void {
    this.rol = JSON.parse(''+ Utils.getSession('personal')).rol;
  }

  doFound(event: Preventivo[]) {
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
          this.item.usuarioBaja = Number(UturuncoUtils.getSession('user'));
          let data = await this.wsdl.doDelete(id, this.item.usuarioBaja).then();
          const result = JSON.parse(JSON.stringify(data));
          if (result.code == 200) {
            this.proccess = false;
            this.id = 0;
            this.selectedRowIndex = 0;
            this.fil.filter();
            swalWithBootstrapButtons.fire(
              'Eliminado exitosamente!',
              'Tu registro ya no existe.',
              'success'
            );
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.proccess = false;
          this.id = 0;
          this.selectedRowIndex = 0;
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Su registro está seguro :)',
            'error'
          );
        }
      });
  }

  seleccion(id: any) {
    switch (this.seleccionAccion.length > 0) {
      case this.seleccionAccion == 'caratula':
        this.router.navigateByUrl('lst-preventivo/caratula/' + id);
        break;
      case this.seleccionAccion == 'snic':
        this.router.navigateByUrl('lst-preventivo/snic/' + id);
        break;
      case this.seleccionAccion == 'medio':
        this.router.navigateByUrl('lst-preventivo/medioUtilizado/' + id);
        break;
      case this.seleccionAccion == 'objeto':
        this.router.navigateByUrl('lst-preventivo/objeto/' + id);
        break;
      case this.seleccionAccion == 'modalidad':
        this.router.navigateByUrl('lst-preventivo/modalidad/' + id);
        break;
      case this.seleccionAccion == 'victimas':
        this.router.navigateByUrl('lst-preventivo/victimas/' + id);
        break;
      case this.seleccionAccion == 'inculpados':
        this.router.navigateByUrl('lst-preventivo/inculpados/' + id);
        break;
      case this.seleccionAccion == 'ampliaciones':
        this.router.navigateByUrl('lst-preventivo/ampliacion/' + id);
        break;
    }
  }

  valor(item: any) {
    item = item;
    let valor = '';
    if (item) {
      valor = 'Si';
    } else {
      valor = 'No';
    }
    return valor;
  }


  clickRow(item: any) {
    this.id = 0;
    this.selectedRowIndex = item.id;
    this.id = this.selectedRowIndex;
    this.proccess = true;
  }

  vaciarDatos(){
    this.id = 0;
    this.selectedRowIndex = 0;
    this.proccess = false;
  }

  linkear(id?: Number) {
    this.router.navigateByUrl('lst-preventivo/abm/' + id);
  }
  linkearDetalle(id: Number) {
    this.router.navigateByUrl('lst-preventivo/detalle/' + id);
  }

  back() {
    this.router.navigate(['principal']);
  }

}
