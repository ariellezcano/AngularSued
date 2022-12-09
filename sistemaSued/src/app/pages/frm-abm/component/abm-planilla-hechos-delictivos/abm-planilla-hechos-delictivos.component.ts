import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelPrevPlanilla } from 'src/app/models/component/models-planillas/modelPrevPlanilla';
import { PlanillaHechosDel } from 'src/app/models/component/models-planillas/planilla-hechos-del';
import { Delito, Preventivo } from 'src/app/models/index.models';
import { PreventivoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-planilla-hechos-delictivos',
  templateUrl: './abm-planilla-hechos-delictivos.component.html',
  styleUrls: ['./abm-planilla-hechos-delictivos.component.scss'],
})
export class AbmPlanillaHechosDelictivosComponent implements OnInit {
  @Output() emmit: EventEmitter<Preventivo[]> = new EventEmitter();

  item: PlanillaHechosDel;

  itemsPrev: ModelPrevPlanilla[];
  itemPr: ModelPrevPlanilla;

  intervencionPol: number = 0;
  denunciaPart: number = 0;

  total: number = 0;

  constructor(
    private wsdl: PreventivoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.item = new PlanillaHechosDel();
    this.itemsPrev = [];
    this.itemPr = new ModelPrevPlanilla();
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
        this.itemsPrev = result.data;
        console.log('items', this.itemsPrev);
        //this.verificar();
      }
    } catch (error) {
      Swal.fire('Error al obtener los datos,' + error);
    }
  }

  ActivarCasilla(num: number) {
    if (num == 1) {
      this.item.localidad = true;
      this.item.departamento = false;
      this.item.zonaMetro = false;
    } else if (num == 2) {
      this.item.localidad = false;
      this.item.departamento = true;
      this.item.zonaMetro = false;
    } else if (num == 3) {
      this.item.localidad = false;
      this.item.departamento = false;
      this.item.zonaMetro = true;
    }
  }

  // verificar(){
  //   for (let index = 0; index < this.itemsPrev.length; index++) {
  //     const element = this.itemsPrev[index];
  //     console.log(element)
      
  //   }
  // }

  cancelar() {
    this.item = new PlanillaHechosDel();
    this.back();
  }

  back() {
    this.router.navigate(['/principal/']);
  }

  vaciarVariables() {
    this.intervencionPol = 0;
    this.denunciaPart = 0;
  }

  //hasta aca llegue
  sumarValores(item: any){
    let acumular = 0;
    let part = 0;
    if(item){

      this.intervencionPol = acumular+=1; 
    }else{
      this.denunciaPart = part+= 1; 
    }
  }
}
