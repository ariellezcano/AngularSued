import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PlanillaSuicidio } from 'src/app/models/component/models-planillas/planillaSuicidio';
import { DataService } from 'src/app/services/data.service';
import { ExelService } from 'src/app/services/planillas/exel.service';
import { PlanillasService } from 'src/app/services/planillas/planillas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-suicidio',
  templateUrl: './abm-suicidio.component.html',
  styleUrls: ['./abm-suicidio.component.scss']
})
export class AbmSuicidioComponent implements OnInit {

  @Output() emmit: EventEmitter<PlanillaSuicidio[]> = new EventEmitter();

  fecha1: any;
  fecha2: any;
  consumado: boolean;
  tentativa: boolean;

  arrSuicidio:PlanillaSuicidio[];

  constructor(
    private wsdl: PlanillasService,
    //private route: ActivatedRoute,
    private excelService: ExelService,
    private dataService: DataService,
    private router: Router
  ) {
    this.arrSuicidio = [];
    this.consumado = false;
    this.tentativa = false;
  }

  ngOnInit(): void {}

  async buscar() {
    let delito = 0;
    try {
      if(this.fecha1 != undefined && this.fecha2 == undefined){
        this.fecha2 = this.fecha1;
      }
      if(this.consumado){
        delito = 5;
      }else if(this.tentativa){
        delito = 6;
      }
      const buscar = this.wsdl.getSuicidio(this.fecha1, this.fecha2, delito);
      let data = await lastValueFrom(buscar);
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.arrSuicidio = result.data;
        this.sendData(this.arrSuicidio)
        console.log(this.arrSuicidio)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Busqueda realizada correctamente, descargue la planilla',
          showConfirmButton: false,
          timer: 1500
        })
        //this.emmit.emit();
      }
    
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Hubo un error en la busqueda de datos!, ${error}`
      })
    }
  }

  // para exportar a excel en la funcion
  exportTableToExcel(): void {
    this.excelService.exportAsExcelFile(this.arrSuicidio, 'archivo');
  }

  sendData(arr: PlanillaSuicidio[]) {
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
    this.router.navigate(['/principal/planillaSuicidios/planillaExcel']);
  }

  ActivarCasilla(num: number) {
    if (num == 1) {
      this.consumado = true;
      this.tentativa = false;
    } else if (num == 2) {
      this.consumado = false;
      this.tentativa = true;
    }
  }

}
