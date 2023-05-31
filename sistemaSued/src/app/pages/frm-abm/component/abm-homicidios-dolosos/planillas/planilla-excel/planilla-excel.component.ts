import { DataService } from './../../../../../../services/data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlanillaHD } from 'src/app/models/index.models';
import { AbmHomicidiosDolososComponent } from '../../abm-homicidios-dolosos.component';
import { PlanillaHd } from 'src/app/models/component/models-planillas/modeloPlanillaHd';
import { Route, Router } from '@angular/router';
import { ExelService } from 'src/app/services/planillas/exel.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-planilla-excel',
  templateUrl: './planilla-excel.component.html',
  styleUrls: ['./planilla-excel.component.scss'],
})
export class PlanillaExcelComponent implements OnInit {
  @ViewChild(AbmHomicidiosDolososComponent, { static: false })
  fil!: AbmHomicidiosDolososComponent;

  //@ViewChild('table', { static: false }) tablaRef!: ElementRef;


  item: PlanillaHd;
  items: PlanillaHd[];
  exportar: boolean;

  constructor(private router: Router, private dataService: DataService, private wsdlExcel: ExelService) {
    this.item = new PlanillaHd();
    this.items = [];
    this.exportar=false;
  }

  ngOnInit(): void {
    this.getDataService();
    console.log('items', this.items);
  }

  getDataService() {
    const data = this.dataService.getDataArray();
    this.items = data;
  }

  back() {
    this.router.navigate(['/principal/']);
  }

  tipoLugar(
    viaPublica: any,
    domParticular: any,
    comercio: any,
    interiorRodados: any,
    carcelComisaria: any,
    otroLugar: any
  ) {
    let valor = '';
    if (viaPublica) {
      valor = '1';
    } else if (domParticular) {
      valor = '2';
    } else if (comercio) {
      valor = '3';
    } else if (interiorRodados) {
      valor = '4';
    } else if (carcelComisaria) {
      valor = '5';
    } else if (otroLugar) {
      valor = '6';
    }
    return valor;
  }

  arma(armaFuego: any, armaBlanca: any, otraArma: any, sinArma: any) {
    let valor = '';
    if (armaFuego) {
      valor = '1';
    } else if (armaBlanca) {
      valor = '2';
    } else if (otraArma) {
      valor = '3';
    } else if (sinArma) {
      valor = '4';
    }
    return valor;
  }

  ocacionDelito(
    siRobo: any,
    abusoSexual: any,
    otroDelito: any,
    noOtroDelito: any
  ) {
    let valor = '';
    if (siRobo) {
      valor = '1';
    } else if (abusoSexual) {
      valor = '2';
    } else if (otroDelito) {
      valor = '3';
    } else if (noOtroDelito) {
      valor = '4';
    }
    return valor;
  }

  intervencion(intervencion: any){
    let valor = "";
    if(intervencion){
      valor = "2";
    }else{
      valor = "1";
    }
    return valor;
  }

  cortarCadena = (data: any) => {
    let cadena = "";
    if(data != undefined && data != ""){
      cadena = data.slice(0,10);
    }
    return cadena;
  }

  // async imprimirExcel(table: string, nombre: string){
  //   this.exportar = true;
  //   await this.wsdlExcel.exportTableToExcel(table,nombre);
  //   this.exportar=false;
  //   if(!this.exportar){
  //     Swal.fire('Dato exportado correctamente')
  //   }
  // }


  exportarExcel(table: string) {
    const tabla = document.getElementById(table);

    /* Crear un libro de Excel y una hoja de cálculo */
    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.table_to_sheet(tabla);

    /* Agregar la hoja de cálculo al libro */
    XLSX.utils.book_append_sheet(libro, hoja, table);

    /* Generar el archivo Excel */
    const nombreArchivo = 'planillaHd.xlsx';
    XLSX.writeFile(libro, nombreArchivo);
  }
}

