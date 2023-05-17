import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PlanillasService } from 'src/app/services/planillas/planillas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-homicidios-dolosos',
  templateUrl: './abm-homicidios-dolosos.component.html',
  styleUrls: ['./abm-homicidios-dolosos.component.scss'],
})
export class AbmHomicidiosDolososComponent implements OnInit {
  @Output() emmit: EventEmitter<[]> = new EventEmitter();

  fecha1: any;
  fecha2: any;

  constructor(
    private wsdl: PlanillasService,
    //private route: ActivatedRoute,
    private router: Router
  ) {
    //this.fecha1 = new Date();
    //this.fecha2 = new Date();
  }

  ngOnInit(): void {}

  async buscar() {

    console.log(this.fecha1, this.fecha2)
    try {
      if(this.fecha1 != undefined && this.fecha2 == undefined){
        this.fecha2 = this.fecha1
      }
      const buscar = this.wsdl.getListHomicidioDoloso(this.fecha1, this.fecha2);
      let data = await lastValueFrom(buscar);
      console.log("buscar", data);
      const result = JSON.parse(JSON.stringify(data));
      //console.log("result", result)
      if (result.code == 200) {
        //this.emmit.emit();
      }
    
    } catch (error) {
      Swal.fire("error")
    }
  }

  // ActivarCasilla(num: number) {
  //   if (num == 1) {
  //     this.item.localidad = true;
  //     this.item.departamento = false;
  //     this.item.zonaMetro = false;
  //   } else if (num == 2) {
  //     this.item.localidad = false;
  //     this.item.departamento = true;
  //     this.item.zonaMetro = false;
  //   } else if (num == 3) {
  //     this.item.localidad = false;
  //     this.item.departamento = false;
  //     this.item.zonaMetro = true;
  //   }
  // }

  cancelar() {
    //this.item = new PlanillaHechosDel();
    this.back();
  }

  back() {
    this.router.navigate(['/principal/']);
  }
}
