import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Delito,
  Departamento,
  Localidad,
  PlanillaHD,
  UnidadesSued,
} from 'src/app/models/index.models';
import { FilAutocompletadoUnidadSuedComponent } from 'src/app/pages/component/fil-autocompletado-unidad-sued/fil-autocompletado-unidad-sued.component';
import { FilBuscadorDelitoComponent } from 'src/app/pages/component/fil-buscador-delito/fil-buscador-delito.component';
import { FilDelitoComponent } from 'src/app/pages/filters/fil-delito/fil-delito.component';
import { PreventivoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-planilla-hd',
  templateUrl: './abm-planilla-hd.component.html',
  styleUrls: ['./abm-planilla-hd.component.scss'],
})
export class AbmPlanillaHDComponent implements OnInit {
  @ViewChild(FilBuscadorDelitoComponent, { static: false })
  filDelito!: FilBuscadorDelitoComponent;
  //@ViewChild(FilAutocompletadoUnidadSuedComponent, { static: false }) filUnidad!: FilAutocompletadoUnidadSuedComponent;

  item: PlanillaHD;
  items: PlanillaHD[];

  constructor(
    private wsdl: PreventivoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.item = new PlanillaHD();
    this.items = [];
  }

  ngOnInit(): void {}

  seleccionLocalidad(event: Localidad) {
    this.item.localidad = event.id;
  }

  seleccionDpto(event: Departamento) {
    this.item.departamento = event.id;
  }

  unidad(event: UnidadesSued) {
    this.item.unidad = event.id;
    this.item.nombreUnidad = event.nombre;
  }

  delito(event: Delito) {
    this.item.delito = event.id;
    this.item.delitoSeleccionado = event.descripcion;
  }

  async buscar() {
    if (this.item.fecha2 == undefined) {
      this.item.fecha2 = this.item.fecha1;
    }
    if (this.item.localidad == undefined) {
      this.item.localidad = 0;
    }
    if (this.item.departamento == undefined) {
      this.item.departamento = 0;
    }
    if (this.item.unidad == undefined) {
      this.item.unidad = 0;
    }
    if (this.item.delito == undefined) {
      this.item.delito = 0;
    }

    try {
      let data = await this.wsdl
        .doFilterPlanilla(
          this.item.fecha1,
          this.item.fecha2,
          this.item.localidad,
          this.item.departamento,
          this.item.unidad,
          this.item.delito
        )
        .then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.items = result.data;
        //console.log('items', this.items);
      }
    } catch (error) {
      Swal.fire('Error al obtener los datos,' + error);
    }
  }

  cancelar() {
    this.item = new PlanillaHD();
    this.back();
  }

  back() {
    this.router.navigate(['/principal/']);
  }
}
