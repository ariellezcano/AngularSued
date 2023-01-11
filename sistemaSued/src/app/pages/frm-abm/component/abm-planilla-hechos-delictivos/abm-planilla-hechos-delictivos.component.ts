import { IfStmt } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelPrevPlanilla } from 'src/app/models/component/models-planillas/modelPrevPlanilla';
import { PlanillaHechosDel } from 'src/app/models/component/models-planillas/planilla-hechos-del';
import { Delito, Preventivo } from 'src/app/models/index.models';
import {
  PreventivoService,
  PrevInculpadoService,
  PrevVictimaService,
} from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-planilla-hechos-delictivos',
  templateUrl: './abm-planilla-hechos-delictivos.component.html',
  styleUrls: ['./abm-planilla-hechos-delictivos.component.scss'],
})
export class AbmPlanillaHechosDelictivosComponent implements OnInit {
  @Output() emmit: EventEmitter<Preventivo[]> = new EventEmitter();

  item: PlanillaHechosDel;

  itemPr: ModelPrevPlanilla;

  itemsPrev: ModelPrevPlanilla[];
  itemsVict: ModelPrevPlanilla[];
  itemsInc: ModelPrevPlanilla[];

  masculino: number = 0;
  femenino: number = 0;
  noConsta: number = 0;

  constructor(
    private wsdl: PreventivoService,
    private route: ActivatedRoute,
    private router: Router,
    private wsdlVictima: PrevVictimaService,
    private wsdlInculpado: PrevInculpadoService 
  ) {
    this.item = new PlanillaHechosDel();
    this.itemsPrev = [];
    this.itemsVict = [];
    this.itemsInc = [];
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
        //console.log('items', this.itemsPrev);
        this.verificar();
        this.buscarVictima();
        this.buscarInculpado();
      }
    } catch (error) {
      Swal.fire('Error al obtener los datos,' + error);
    }
  }

 async buscarVictima(){
  try {
    let data = await this.wsdlVictima
      .doFilterPlanillaHDVictima(
        this.item.fecha1,
        this.item.fecha2,
        this.item.localidad,
        this.item.departamento,
        this.item.zonaMetro,
        this.item.dnpc
      )
      .then();
    const result = JSON.parse(JSON.stringify(data));
    //console.log("datos", this.item);
    if (result.code == 200) {
      //console.log("resultado de busqueda",result.data)
      this.itemsVict = result.data;
      this.verificarVictima();
      //this.verificarNuevo();
    }
  } catch (error) {
    Swal.fire('Error al obtener los datos,' + error);
  }
 }

 async buscarInculpado(){
  try {
    let data = await this.wsdlInculpado
      .doFilterPlanillaHDInc(
        this.item.fecha1,
        this.item.fecha2,
        this.item.localidad,
        this.item.departamento,
        this.item.zonaMetro,
        this.item.dnpc
      )
      .then();
    const result = JSON.parse(JSON.stringify(data));
    //console.log("datos", this.item);
    if (result.code == 200) {
      console.log("resultado de busqueda",result.data)
      this.itemsInc = result.data;
      //this.verificarVictima();
      //this.verificarNuevo();
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

  verificar() {
    console.log('prev', this.itemsPrev);
    for (let index = 0; index < this.itemsPrev.length; index++) {
      this.itemsPrev[index].totalIntervencion = 0;
      this.itemsPrev[index].totalDenParticular = 0;
      const arr = this.itemsPrev[index].dnpc;
      arr.forEach((element1) => {
        element1.intervenPol = 0;
        element1.denunciaPart = 0;
        element1.lstDel.forEach((element2) => {
          if (element2.intervencionPol) {
            element1.intervenPol++;
            this.itemsPrev[index].totalIntervencion++;
          } else {
            element1.denunciaPart++;
            this.itemsPrev[index].totalDenParticular++;
          }
        });
      });
    }
  }

  verificarVictima() {
    console.log('data', this.itemsVict);
    for (let index = 0; index < this.itemsVict.length; index++) {
      //this.itemsVict[index].totalVcitFem = 0;
      //this.itemsVict[index].totalVictMasc = 0;
      //this.itemsVict[index].totalVictNoConsta = 0;
      const arr = this.itemsVict[index].dnpc;
      arr.forEach((element1) => {
        element1.masculino = 0;
        element1.femenino = 0;
        element1.noConsta = 0;
        element1.lstDelVict.forEach((element2) => {
          if (element2.sexoNavigation.id == 1) {
            element1.masculino++;
            //this.itemsVict[index].totalVictMasc++;
          } else if (element2.sexoNavigation.id == 2) {
            element1.femenino++;
            //this.itemsVict[index].totalVcitFem++;
          } else if (element2.sexoNavigation.id == 3) {
            element1.noConsta++;
            //this.itemsVict[index].totalVictNoConsta++;
          }
        });
      });
    }
  }

  cancelar() {
    this.item = new PlanillaHechosDel();
    this.back();
  }

  back() {
    this.router.navigate(['/principal/']);
  }

  // vaciarVariables() {
  //   this.intervencionPol = 0;
  //   this.denunciaPart = 0;
  // }

  //hasta aca llegue
}
