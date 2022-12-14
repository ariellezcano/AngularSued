import { IfStmt } from '@angular/compiler';
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
  intervenPol: any [];
  denParticular: [];
  total: number = 0;

  insert = {
    departamento: '',
    delito: '',
    intervenPol: Number,
    denParticular: Number,
    total: Number,
  };

  constructor(
    private wsdl: PreventivoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.item = new PlanillaHechosDel();
    this.itemsPrev = [];
    this.intervenPol = [];
    this.denParticular = [];
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
        this.verificar();
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

  verificar(){
    for (let index = 0; index < this.itemsPrev.length; index++) {
      const element = this.itemsPrev[index].departamento;
      const arr = this.itemsPrev[index].dnpc;
      console.log(arr)
      if(element == "SAN FERNANDO"){
        for (let index = 0; index < arr.length; index++) {
          const tamanio = arr.length;
          let delito = arr[index].nombre;
          if(arr[index].nombre == delito && arr.length <= tamanio){
            arr[index].lstDel.forEach(element => {
              console.log(element)
              
            });
          }
          
          
        }
      }   
    }
  }

  // verificar() {
  //   // alert("aca estoy")
  //   for (let index = 0; index < this.itemsPrev.length; index++) {
  //     const element = this.itemsPrev[index].departamento;
  //     const arr = this.itemsPrev[index].dnpc;
  //     arr.forEach((element1) => {
  //       let delito = element1.nombre;
  //       element1.lstDel.forEach((element2) => {
  //         console.log(element1.lstDel);
  //         if (element2.intervencionPol) {
  //           const verificar = this.intervenPol.indexOf(element);
  //           if (verificar == -1) {
  //             let numero: any = Number(element2.intervencionPol);
  //             this.insert.departamento = element;
  //             this.insert.delito = delito;
  //             this.insert.intervenPol = numero;

  //             this.intervenPol.push(this.insert)
  //           } else {
  //             if (verificar !== -1) {
  //               const del = this.intervenPol.indexOf(delito);
  //               let numero: any = Number(element2.intervencionPol);
  //               if (del !== -1) {
  //                 this.intervenPol.forEach(i => {
  //                   if(i.insert.departamento == element){
  //                     if(i.insert.delito == delito){
  //                       let objIndex = this.intervenPol.findIndex((obj => obj.insert.intervencionPol));
  //                       let suma = i.insert.intervencionPol + numero;
  //                       this.intervenPol[objIndex].intervencionPol = suma;
  //                     }
  //                   } 
  //                 });
  //               } else {
  //                 this.insert.departamento = element;
  //                 this.insert.delito = delito;
  //                 this.insert.intervenPol = numero;
  //                 this.intervenPol.push(this.insert)
  //               }
  //             }
  //           }
  //         } else {
  //           const verificar = this.intervenPol.indexOf(element);
  //           //console.log("verificar1", verificar);
  //           if (verificar == -1) {
  //             let numero: any = Number(element2.intervencionPol);
  //             this.insert.departamento = element;
  //             this.insert.delito = delito;
  //             this.insert.denParticular = numero;

  //             this.intervenPol.push(this.insert)
  //           } else {
  //             if (verificar !== -1) {
  //               const del = this.intervenPol.indexOf(delito);
  //               let numero: any = Number(element2.intervencionPol);
  //               if (del !== -1) {
  //                 this.intervenPol.forEach(i => {
  //                   if(i.insert.departamento == element){
  //                     if(i.insert.delito == delito){
  //                       let objIndex = this.intervenPol.findIndex((obj => obj.insert.denParticular));
  //                       console.log("objIndex",objIndex)
  //                       let suma = i.insert.denunciaPart + numero;
  //                       this.intervenPol[objIndex].denParticular = suma;
  //                     }
  //                   } 
  //                 });
  //               } else {
  //                 this.insert.departamento = element;
  //                 this.insert.delito = delito;
  //                 this.insert.denParticular = numero;
  //                 this.intervenPol.push(this.insert)
  //               }
  //             }
  //           }
  //         }
  //       });
  //     });
  //   }
  //  // console.log("aca estoy", this.insert)
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
}
