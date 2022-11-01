import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModeloVehiculo } from 'src/app/models/index.models';
import { ModeloVehiculoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-modelo-auto',
  templateUrl: './fil-modelo-auto.component.html',
  styleUrls: ['./fil-modelo-auto.component.scss']
})
export class FilModeloAutoComponent implements OnInit {

  @Output() emmit: EventEmitter<ModeloVehiculo> = new EventEmitter();

  busqueda: any;

  item: ModeloVehiculo;
  items: ModeloVehiculo[];
  constructor(private wsdl: ModeloVehiculoService) {
    this.busqueda = '';
    this.item = new ModeloVehiculo();
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

  capturar(event: ModeloVehiculo) {
    if (event != undefined) {
      this.busqueda = event.descripcion;
      this.emmit.emit(event)
    }
  }

}
