import { Component, OnInit } from '@angular/core';
import { Preventivo } from 'src/app/models/index.models';

@Component({
  selector: 'app-planilla-hechos-delictivos',
  templateUrl: './planilla-hechos-delictivos.component.html',
  styleUrls: ['./planilla-hechos-delictivos.component.scss']
})
export class PlanillaHechosDelictivosComponent implements OnInit {


  items: Preventivo[];

  constructor() {
    this.items = [];
   }

  ngOnInit(): void {
  }

  doFound(event: Preventivo[]) {
    this.items = event;
  }
  
}
