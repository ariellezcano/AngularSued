/*genera exel 
npm install file-saver
npm install xlsx 


// para exportar a excel en la funcion
  exportTableToExcel(): void {
    this.excelService.exportAsExcelFile("aca va el array", 'nombre que quieras para el excel');
  }

*/
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExelService {
  constructor() {}

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

//boton para exportar
// <button *ngIf="items.length > 0"
//     (click)="exportTableToExcel('tabla', 'Equipos')"
//     class="btn btn-outline-success flotante"
//   >
//   <i class="far fa-file-excel"></i>
//     Descargar Excel
//   </button>


  //para exportar datos a excel
  // async exportTableToExcel(tableID: any, filename = '') {
  //   this.exportar = true;
  //   await UturuncoUtils.delay(300);
  //   await UturuncoUtils.exportTableToExcel(tableID, filename).then();

  //   this.exportar = false;
  // }

  //static
  //  exportTableToExcel(tableID: any, filename = '') {
  //   return new Promise((resolve) => {
  //     var downloadLink;
  //     var dataType = 'application/vnd.ms-excel';
  //     var navigator: any;

  //     var tableSelect: any = document.getElementById(tableID);
  //     console.log(tableSelect);
  //     var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

  //     // Specify file name
  //     filename = filename ? filename + '.xls' : 'excel_data.xls';

  //     // Create download link element
  //     downloadLink = document.createElement('a');

  //     document.body.appendChild(downloadLink);

  //     // Create a link to the file
  //     downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

  //     // Setting the file name
  //     downloadLink.download = filename;

  //     //triggering the function
  //     downloadLink.click();
  //     resolve(true);
  //   });
  // }
  // static delay(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
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
