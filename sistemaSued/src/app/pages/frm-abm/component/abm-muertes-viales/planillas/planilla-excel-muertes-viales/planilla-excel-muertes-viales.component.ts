import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PlanillaMuertesViales } from 'src/app/models/component/models-planillas/planilla-muertes-viales';
import { DataService } from 'src/app/services/data.service';
import { ExelService } from 'src/app/services/planillas/exel.service';
import { AbmMuertesVialesComponent } from '../../abm-muertes-viales.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-planilla-excel-muertes-viales',
  templateUrl: './planilla-excel-muertes-viales.component.html',
  styleUrls: ['./planilla-excel-muertes-viales.component.scss'],
})
export class PlanillaExcelMuertesVialesComponent implements OnInit {
  @ViewChild(AbmMuertesVialesComponent, { static: false })
  fil!: AbmMuertesVialesComponent;

  @ViewChild('table', { static: false }) tablaRef!: ElementRef;

  item: PlanillaMuertesViales;
  items: PlanillaMuertesViales[];
  exportar: boolean;

  constructor(
    private router: Router,
    private dataService: DataService,
    private wsdlExcel: ExelService
  ) {
    this.item = new PlanillaMuertesViales();
    this.items = [];
    this.exportar = false;
  }

  ngOnInit(): void {
    this.getDataService();
  }

  getDataService() {
    this.items = [];
    const data = this.dataService.getDataArray();
    this.items = data;
    console.log("items datos",this.items)
  }

  back() {
    this.dataService.dataArray = [];
    this.router.navigate(['/principal/']);
  }

  tipoLugar(
    lugarCalle: any,
    rutaNacional: any,
    rutaProvincial: any,
    autopistaNacional: any,
    autopistaProvincial: any,
    autovia: any,
    sinDeterminarLugar: any
  ) {
    let valor = '';
    if (lugarCalle) {
      valor = '1';
    } else if (rutaNacional) {
      valor = '2';
    } else if (rutaProvincial) {
      valor = '3';
    } else if (autopistaNacional) {
      valor = '4';
    } else if (autopistaProvincial) {
      valor = '5';
    } else if (autovia) {
      valor = '6';
    } else if (sinDeterminarLugar) {
      valor = '99';
    }
    return valor;
  }

  semaforo(
    semaforoFunciona: any,
    semaforoNoFunciona: any,
    sinSemaforo: any,
    semaforoIntermitente: any,
    sinDeterminarSemaforo: any
  ) {
    let valor = '';
    if (semaforoFunciona) {
      valor = '1';
    } else if (semaforoNoFunciona) {
      valor = '2';
    } else if (sinSemaforo) {
      valor = '3';
    } else if (semaforoIntermitente) {
      valor = '4';
    } else if (sinDeterminarSemaforo) {
      valor = '99';
    }
    return valor;
  }

  modalidad(
    armaFuego: any,
    armaElementoContundente: any,
    sumersion: any,
    envenenamiento: any,
    seArroja: any,
    seArrojaVia: any,
    ahorcamiento: any,
    seIncinera: any,
    otraModalidad: any,
    sinDeterminarModalidad: any
  ) {
    let valor = '';
    if (armaFuego) {
      valor = '1';
    } else if (armaElementoContundente) {
      valor = '2';
    } else if (sumersion) {
      valor = '3';
    } else if (envenenamiento) {
      valor = '4';
    } else if (ahorcamiento) {
      valor = '5';
    } else if (seArroja) {
      valor = '6';
    } else if (seArrojaVia) {
      valor = '7';
    } else if (otraModalidad) {
      valor = '8';
    } else if (seIncinera) {
      valor = '9';
    } else if (sinDeterminarModalidad) {
      valor = '99';
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

  intervencion(intervencion: any) {
    let valor = '';
    if (intervencion) {
      valor = '2';
    } else {
      valor = '1';
    }
    return valor;
  }

  modoProduccion(
    vehiculoPeaton: any,
    vehiculoVehiculo: any,
    vehiculoObjeto: any,
    vuelcoDespiste: any,
    otroModoProd: any,
    sinDeterminarModoProd: any
    
  ) {
    let valor = '';
    if (vehiculoPeaton) {
      valor = '1';
    } else if (vehiculoVehiculo) {
      valor = '2';
    } else if (vehiculoObjeto) {
      valor = '3';
    } else if (vuelcoDespiste) {
      valor = '4';
    } else if (otroModoProd) {
      valor = '5';
    }else if (sinDeterminarModoProd) {
      valor = '99';
    }
    return valor;
  }

  clima(
    climaNormal: any,
    nublado: any,
    lluvia: any,
    llovizna: any,
    niebla: any,
    granizo: any,
    otraCondicion: any,
    sinDeterminarCondicion: any
  ) {
    let valor = '';
    if (climaNormal) {
      valor = '1';
    } else if (nublado) {
      valor = '2';
    } else if (lluvia) {
      valor = '3';
    } else if (llovizna) {
      valor = '4';
    }else if (granizo) {
      valor = '6';
    }else if (otraCondicion) {
      valor = '7';
    }else if (sinDeterminarCondicion) {
      valor = '99';
    }else if (niebla) {
      valor = '7';
      this.item.especifCondicionClima = 'Niebla'
    }
    return valor;
  }

  cortarCadena = (data: any) => {
    let cadena = '';
    if (data != undefined && data != '') {
      cadena = data.slice(0, 10);
    }
    return cadena;
  };

  // async imprimirExcel(table: string, nombre: string){
  //   this.exportar = true;
  //   await this.wsdlExcel.exportTableToExcel(table,nombre);
  //   this.exportar=false;
  //   if(!this.exportar){
  //     Swal.fire('Dato exportado correctamente')
  //   }
  // }

  verificarDireccion(nombre: string | null, adicional: string | null) {
    let dato = '';
    //alert("aca llegue")
    console.log('direccion', nombre, adicional);
    if (nombre != null) {
      dato = nombre;
    } else if (adicional != null) {
      dato = adicional;
    }
    return dato;
  }

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
