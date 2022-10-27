import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArmaMarca } from 'src/app/models/index.models';
import { ArmaMarcaService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-arma',
  templateUrl: './fil-arma.component.html',
  styleUrls: ['./fil-arma.component.scss']
})
export class FilArmaComponent implements OnInit {

  @Output() emmit: EventEmitter<ArmaMarca> = new EventEmitter();

  busqueda: any;

  item: ArmaMarca;
  items: ArmaMarca[];
  constructor(private wsdl: ArmaMarcaService) {
    this.busqueda = '';
    this.item = new ArmaMarca();
    this.items = []
   }

  ngOnInit(): void {
  }

  async filtrar() {
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdl.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.items = [];
          this.items = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la busqueda realizada');
        }
      }
    } catch (error) {}
  }

  capturar(event: ArmaMarca) {
    if (event != undefined) {
      this.busqueda = event.descripcion;
      this.emmit.emit(event)
    }
  }
}
