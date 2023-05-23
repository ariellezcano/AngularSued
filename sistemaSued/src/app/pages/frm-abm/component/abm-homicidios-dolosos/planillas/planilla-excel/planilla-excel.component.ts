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
  }

  getDataService() {
    const data = this.dataService.getDataArray();
    this.items = data;
  }

  back() {
    this.router.navigate(['/principal/']);
  }


  tipoLugar() {
    
  }
  
}
