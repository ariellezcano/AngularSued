import { DataService } from './../../../../../../services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanillaHD } from 'src/app/models/index.models';
import { AbmHomicidiosDolososComponent } from '../../abm-homicidios-dolosos.component';
import { PlanillaHd } from 'src/app/models/component/models-planillas/modeloPlanillaHd';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-planilla-excel',
  templateUrl: './planilla-excel.component.html',
  styleUrls: ['./planilla-excel.component.scss'],
})
export class PlanillaExcelComponent implements OnInit {
  @ViewChild(AbmHomicidiosDolososComponent, { static: false })
  fil!: AbmHomicidiosDolososComponent;

  item: PlanillaHd;
  items: PlanillaHd[];

  constructor(private router: Router, private dataService: DataService) {
    this.item = new PlanillaHd();
    this.items = [];
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

  cortarCadena(data: any){
    let cadena = "";
    if(data != undefined && data != ""){
      cadena = data.slice(0,10);
    }
    return cadena;
  }
}
