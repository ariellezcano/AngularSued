import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PlanillaDelPropiedad } from 'src/app/models/component/models-planillas/planilla-delPropiedad';
import { DataService } from 'src/app/services/data.service';
import { ExelService } from 'src/app/services/planillas/exel.service';
import { PlanillasService } from 'src/app/services/planillas/planillas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-delitos-propiedad',
  templateUrl: './abm-delitos-propiedad.component.html',
  styleUrls: ['./abm-delitos-propiedad.component.scss'],
})
export class AbmDelitosPropiedadComponent implements OnInit {
  @Output() emmit: EventEmitter<PlanillaDelPropiedad[]> = new EventEmitter();

  fecha1: any;
  fecha2: any;

  vacio: boolean = false;

  arrDelPropiedad: PlanillaDelPropiedad[];

  constructor(
    private wsdl: PlanillasService,
    //private route: ActivatedRoute,
    private excelService: ExelService,
    private dataService: DataService,
    private router: Router
  ) {
    this.arrDelPropiedad = [];
  }

  ngOnInit(): void {}

  async buscar() {
    try {
      if (this.fecha1 != undefined && this.fecha2 == undefined) {
        this.fecha2 = this.fecha1;
      }
      const buscar = this.wsdl.getDelPropiedad(this.fecha1, this.fecha2);
      let data = await lastValueFrom(buscar);
      const result = JSON.parse(JSON.stringify(data));
      //console.log('result', result);
      if (result.code == 200) {
        this.arrDelPropiedad = result.dataAgrupada;
        console.log('planilla delPropiedad', this.arrDelPropiedad);
        this.sendData(this.arrDelPropiedad);
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
    this.excelService.exportAsExcelFile(this.arrDelPropiedad, 'archivo');
  }

  sendData(arr: PlanillaDelPropiedad[]) {
    this.dataService.dataArray = [];
    this.dataService.setDataArray(arr);
  }

  cancelar() {
    //this.item = new PlanillaHechosDel();
    this.back();
  }

  back() {
    this.router.navigate(['/principal/']);
  }

  planillaExcel() {
    this.router.navigate(['/principal/planillaDelPropiedad/planillaExcel']);
  }
}
