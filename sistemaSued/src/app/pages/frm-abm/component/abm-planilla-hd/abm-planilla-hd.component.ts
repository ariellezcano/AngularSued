import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
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
import { DataService } from 'src/app/services/data.service';
import { PreventivoService } from 'src/app/services/index.service';
import { ExelService } from 'src/app/services/planillas/exel.service';
import { PlanillasService } from 'src/app/services/planillas/planillas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-planilla-hd',
  templateUrl: './abm-planilla-hd.component.html',
  styleUrls: ['./abm-planilla-hd.component.scss'],
})
export class AbmPlanillaHDComponent implements OnInit {
  @Output() emmit: EventEmitter<PlanillaHD[]> = new EventEmitter();

  fecha1: any;
  fecha2: any;

  vacio: boolean = false;

  arrHd: PlanillaHD[];

  constructor(
    private wsdl: PlanillasService,
    //private route: ActivatedRoute,
    private excelService: ExelService,
    private dataService: DataService,
    private router: Router
  ) {
    this.arrHd = [];
  }

  ngOnInit(): void {}

  async buscar() {
    try {
      if (this.fecha1 != undefined && this.fecha2 == undefined) {
        this.fecha2 = this.fecha1;
      }
      const buscar = this.wsdl.getHechoDelictivo(this.fecha1, this.fecha2);
      let data = await lastValueFrom(buscar);
      const result = JSON.parse(JSON.stringify(data));
      //console.log('result', result);
      if (result.code == 200) {
        this.arrHd = result.dataAgrupada;
        console.log('planilla delPropiedad', this.arrHd);
        this.sendData(this.arrHd);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Busqueda realizada correctamente!, descargue la planilla',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.code == 204) {
        this.vacio = true;
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Hubo un error en la busqueda de datos!, ${error}`,
      });
    }
  }

  // para exportar a excel en la funcion
  exportTableToExcel(): void {
    this.excelService.exportAsExcelFile(this.arrHd, 'archivo');
  }

  sendData(arr: PlanillaHD[]) {
    this.dataService.dataArray = [];
    this.dataService.setDataArray(arr);
  }

  cancelar() {
    //this.item = new PlanillaHechosDel();
    this.back();
  }

  planillaExcel() {
    this.router.navigate(['/principal/planillaHechosDelictivos/planillaExcel']);
  }

  back() {
    this.router.navigate(['/principal/']);
  }
}
