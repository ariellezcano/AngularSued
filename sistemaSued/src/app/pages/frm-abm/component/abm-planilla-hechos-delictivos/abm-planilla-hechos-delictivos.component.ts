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
  intervenPol: any [];
  denunciaPart: number = 0;
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
        //console.log('items', this.itemsPrev);
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

  verificar() {
    let nombre = '';
    // alert("aca estoy")
    for (let index = 0; index < this.itemsPrev.length; index++) {
      const element = this.itemsPrev[index].departamento;
      const arr = this.itemsPrev[index].dnpc;
      //console.log("arr", arr)
      arr.forEach((element1) => {
        nombre = element1.nombre;
        element1.lstDel.forEach((element2) => {
         // console.log("arr", element1.lstDel)
          if (element2.intervencionPol) {
            const verificar = this.intervenPol.find(
              (e) => e == this.insert.departamento
            );
            console.log("verificar", verificar);
            if (verificar == undefined) {
              let delito = nombre;
              let numero: any = Number(element2.intervencionPol);

              this.insert.departamento = element;
              this.insert.delito = delito;
              this.insert.intervenPol = numero;

              this.intervenPol.push(this.insert)
              
              console.log("arr interven Pol",this.intervenPol)
            } else {
              if (verificar) {
                const delito = this.intervenPol.find(
                  (e) => element1.nombre == this.insert.delito
                );
                let numero: any = Number(element2.intervencionPol);
                if (delito) {
                  this.insert.intervenPol =
                    Number(element2.intervencionPol) + numero;
                  //this.intervenPol.push(insert)
                } else {
                  this.insert.departamento = element;
                  this.insert.delito = nombre;
                  this.insert.intervenPol = numero;
                }
              }
              // alert("no existe")
            }

            //this.intervenPol.push()
          } else {
            const verificar = this.intervenPol.find(
              (e) => e == this.insert.departamento
            );
            if (!verificar) {
              let delito = nombre;
              let numero: any = Number(element2.intervencionPol);

              this.insert.departamento = nombre;
              this.insert.delito = delito;
              this.insert.denParticular = numero;
            } else {
              if (verificar) {
                const delito = this.intervenPol.find(
                  (e) => element1.nombre == this.insert.delito
                );
                let numero: any = Number(element2.intervencionPol);
                if (delito) {
                  this.insert.denParticular =
                    Number(element2.intervencionPol) + numero;
                }
              } else {
                let numero: any = Number(element2.intervencionPol);

                this.insert.departamento = element;
                this.insert.delito = nombre;
                this.insert.denParticular = numero;
              }
              // alert("no existe")
            }
          }
        });
      });
      //console.log('elemento del bucle', element);
    }
   // console.log("aca estoy", this.insert)
  }

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
