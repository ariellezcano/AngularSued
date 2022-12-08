import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanillaHechosDel } from 'src/app/models/component/models-planillas/planilla-hechos-del';
import { Preventivo } from 'src/app/models/index.models';
import { PreventivoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-planilla-hechos-delictivos',
  templateUrl: './abm-planilla-hechos-delictivos.component.html',
  styleUrls: ['./abm-planilla-hechos-delictivos.component.scss'],
})
export class AbmPlanillaHechosDelictivosComponent implements OnInit {
  @Output() emmit: EventEmitter<Preventivo[]> = new EventEmitter();
  
  //array para guardar denuncias
  denuncia: Preventivo[];
  intervenPol: Preventivo[];

  item: PlanillaHechosDel;

  itemPrev: Preventivo;
  items:Preventivo[];

  intervencionPol: number = 0;
  denunciaPart: number = 0;
  
  total: number = 0;
  // itemss: Preventivo[];

  constructor(
    private wsdl: PreventivoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.item = new PlanillaHechosDel();
    this.items = [];
    this.denuncia = [];
    this.intervenPol = [];
    this.itemPrev = new Preventivo();
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
        this.verificar();
        console.log('items', this.items);
      }
    } catch (error) {
      Swal.fire('Error al obtener los datos,' + error);
    }
  }

  // verificar() {
  //   this.items.forEach((element) => {
  //       if (element.intervencionPol) {
  //         this.denuncia.push(element)
  //         this.intervencionPol = this.denuncia.length;
  //         console.log("intervenPol",this.intervencionPol);
  //       } else {
  //         this.intervenPol.push(element);
  //         this.denunciaPart = this.intervenPol.length;
  //         console.log("denunciaPart",this.denunciaPart)
  //       }
  //   });
  //   this.total = this.intervencionPol + this.denunciaPart;
  // }

   verificar() {
    this.items.forEach((element) => {
        if (element.intervencionPol) {
          this.denuncia.push(element)
          this.intervencionPol = this.denuncia.length;
          console.log("intervenPol",this.intervencionPol);
        } else {
          this.intervenPol.push(element);
          this.denunciaPart = this.intervenPol.length;
          console.log("denunciaPart",this.denunciaPart)
        }
    });
    this.total = this.intervencionPol + this.denunciaPart;
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

  cancelar() {
    this.item = new PlanillaHechosDel();
    this.back();
  }

  back() {
    this.router.navigate(['/principal/']);
  }

  vaciarVariables(){
    this.intervencionPol = 0;
    this.denunciaPart = 0;
  }
}