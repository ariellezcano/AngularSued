import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PlanillaMuertesViales } from 'src/app/models/component/models-planillas/planilla-muertes-viales';
import { DataService } from 'src/app/services/data.service';
import { ExelService } from 'src/app/services/planillas/exel.service';
import { PlanillasService } from 'src/app/services/planillas/planillas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-muertes-viales',
  templateUrl: './abm-muertes-viales.component.html',
  styleUrls: ['./abm-muertes-viales.component.scss'],
})
export class AbmMuertesVialesComponent implements OnInit {
  @Output() emmit: EventEmitter<PlanillaMuertesViales[]> = new EventEmitter();

  fecha1: any;
  fecha2: any;

  vacio: boolean = false;

  arrMuerteVial: PlanillaMuertesViales[];

  constructor(
    private wsdl: PlanillasService,
    //private route: ActivatedRoute,
    private excelService: ExelService,
    private dataService: DataService,
    private router: Router
  ) {
    this.arrMuerteVial = [];
  }

  ngOnInit(): void {}

  async buscar() {
    try {
      if (this.fecha1 != undefined && this.fecha2 == undefined) {
        this.fecha2 = this.fecha1;
      }
      const buscar = this.wsdl.getMuertesViales(this.fecha1, this.fecha2);
      let data = await lastValueFrom(buscar);
      console.log('data', data);
      const result = JSON.parse(JSON.stringify(data));
      console.log('result', result);
      if (result.code == 200) {
        this.arrMuerteVial = result.data;
        this.sendData(this.arrMuerteVial);
        console.log('planilla muerte vial', this.arrMuerteVial);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Busqueda realizada correctamente, descargue la planilla',
          showConfirmButton: false,
          timer: 1500,
        });
        //this.emmit.emit();
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
    this.excelService.exportAsExcelFile(this.arrMuerteVial, 'archivo');
  }

  sendData(arr: PlanillaMuertesViales[]) {
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
    this.router.navigate(['/principal/planillaMuerteVial/planillaExcel']);
  }
}
