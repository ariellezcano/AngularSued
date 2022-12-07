import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanillaHechosDel } from 'src/app/models/component/models-planillas/planilla-hechos-del';
import { Preventivo } from 'src/app/models/index.models';
import { PreventivoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-planilla-hechos-delictivos',
  templateUrl: './abm-planilla-hechos-delictivos.component.html',
  styleUrls: ['./abm-planilla-hechos-delictivos.component.scss']
})
export class AbmPlanillaHechosDelictivosComponent implements OnInit {
  @Output() emmit: EventEmitter<Preventivo[]> = new EventEmitter();
  
  item: PlanillaHechosDel;
  items: Preventivo[];

  constructor(
    private wsdl: PreventivoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.item = new PlanillaHechosDel();
    this.items = [];
  }

  ngOnInit(): void {}


  async buscar() {
    if (this.item.fecha2 == undefined) {
      this.item.fecha2 = this.item.fecha1;
    }

    try {
      let data = await this.wsdl
        .doFilterPlanillaHD(
          this.item.fecha1,
          this.item.fecha2,
          this.item.localidad,
          this.item.departamento,
          this.item.zonaMetro,
          this.item.dnpc
        )
        .then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.items = result.data;
        console.log('items', this.items);
      }
    } catch (error) {
      Swal.fire('Error al obtener los datos,' + error);
    }
  }

  ActivarCasilla(num: number){
    if(num == 1){
      this.item.localidad = true;
      this.item.departamento = false;
      this.item.zonaMetro = false;
    }else if(num == 2){
      this.item.localidad = false;
      this.item.departamento = true;
      this.item.zonaMetro = false;
    }else if(num == 3){
      this.item.localidad = false;
      this.item.departamento = false;
      this.item.zonaMetro = true;
    }
  }

  cancelar() {
    this.item = new PlanillaHechosDel();
    this.back();
  }

  back() {
    this.router.navigate(['/principal/']);
  }
}
