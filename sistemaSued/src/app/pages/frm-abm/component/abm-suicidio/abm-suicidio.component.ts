import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-suicidio',
  templateUrl: './abm-suicidio.component.html',
  styleUrls: ['./abm-suicidio.component.scss']
})
export class AbmSuicidioComponent implements OnInit {

  @Output() emmit: EventEmitter<PlanillaHd[]> = new EventEmitter();

  fecha1: any;
  fecha2: any;

  arrHomicidio:PlanillaHd[];

  constructor(
    private wsdl: PlanillasService,
    //private route: ActivatedRoute,
    private excelService: ExelService,
    private dataService: DataService,
    private router: Router
  ) {
    //this.fecha1 = new Date();
    //this.fecha2 = new Date();
    this.arrHomicidio = [];
  }

  ngOnInit(): void {}

  async buscar() {
    try {
      if(this.fecha1 != undefined && this.fecha2 == undefined){
        this.fecha2 = this.fecha1
      }
      const buscar = this.wsdl.getListHomicidioDoloso(this.fecha1, this.fecha2);
      let data = await lastValueFrom(buscar);
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.arrHomicidio = result.data;
        //this.emmit.emit(this.arrHomicidio)
        this.sendData(this.arrHomicidio)
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
    this.excelService.exportAsExcelFile(this.arrHomicidio, 'archivo');
  }

  sendData(arr: PlanillaHd[]) {
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
    this.router.navigate(['/principal/planillaHomicidiosDolosos/planillaExcel']);
  }

}
