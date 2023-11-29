import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbmPlanillaHDComponent } from '../../abm-planilla-hd.component';
import { PlanillaHD } from 'src/app/models/index.models';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ExelService } from 'src/app/services/planillas/exel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-planilla-excel-hechos-delictivos',
  templateUrl: './planilla-excel-hechos-delictivos.component.html',
  styleUrls: ['./planilla-excel-hechos-delictivos.component.scss']
})
export class PlanillaExcelHechosDelictivosComponent implements OnInit {
  @ViewChild(AbmPlanillaHDComponent, { static: false })
  fil!: AbmPlanillaHDComponent;

  @ViewChild('table', { static: false }) tablaRef!: ElementRef;

  item: PlanillaHD;
  items: PlanillaHD[];
  exportar: boolean;

  constructor(
    private router: Router,
    private dataService: DataService,
    private wsdlExcel: ExelService
  ) {
    this.item = new PlanillaHD();
    this.items = [];
    this.exportar = false;
  }

  ngOnInit(): void {
    this.getDataService();
  }

  // ngAfterViewInit() {
  //   if (this.tablaRef && this.tablaRef.nativeElement) {
  //     setTimeout(() => {
  //       const data = this.tablaRef.nativeElement;
  //       //console.log('adentro', data);
  //     }, 3000);
  //   }
  // }

  getDataService() {
    this.items = [];
    const data = this.dataService.getDataArray();
    this.items = data;
    ////console.log("items datos",this.items)
  }

  back() {
    this.dataService.dataArray = [];
    this.router.navigate(['/principal/']);
  }

  delito(delito: any) {
    let valor = '';
    if (delito == 'HURTO') {
      valor = '1 - HURTOS';
    } else if (delito == 'HURTO DE AUTOMOTORES') {
      valor = '2 - HURTOS DE AUTOMOTORES';
    } else if (delito == 'HURTO DE MOTOCICLETAS') {
      valor = '9 - HURTOS DE MOTOCICLETAS';
    } else if (delito == 'ROBO DE AUTOMOTORES') {
      valor = '4 - ROBO DE AUTOMOTORES';
    } else if (delito == 'ROBO A BANCO') {
      valor = '5 - ROBO A BANCOS';
    } else if (delito == 'ROBO DE MOTOCICLETAS') {
      valor = '6 - ROBO DE MOTOCICLETAS';
    } else if (delito == 'ROBO') {
      valor = '3 - ROBO (EXCLUIR AUTOMOTORES, BANCOS Y MOTOCICLETAS)';
    } else if (delito == 'SECUESTRO') {
      valor = '8 - SECUESTROS';
    } else if (delito == 'EXTORSION') {
      valor = '7 - EXTORSIONES';
    }
    return valor;
  }

  // async imprimirExcel(table: string, nombre: string){
  //   this.exportar = true;
  //   await this.wsdlExcel.exportTableToExcel(table,nombre);
  //   this.exportar=false;
  //   if(!this.exportar){
  //     Swal.fire('Dato exportado correctamente')
  //   }
  // }

  exportarExcel(nombre: string) {
    if (this.tablaRef && this.tablaRef.nativeElement) {
      const tabla = this.tablaRef.nativeElement;

      /* Crear un libro de Excel y una hoja de cálculo */
      const libro = XLSX.utils.book_new();
      const hoja = XLSX.utils.table_to_sheet(tabla);

      /* Agregar la hoja de cálculo al libro */
      XLSX.utils.book_append_sheet(libro, hoja, 'table');

      /* Generar el archivo Excel */
      const nombreArchivo = nombre;
      XLSX.writeFile(libro, nombreArchivo);
    } else {
      console.error(
        'El elemento tablaRef no está definido o no tiene un elemento nativo.'
      );
    }
  }

}
