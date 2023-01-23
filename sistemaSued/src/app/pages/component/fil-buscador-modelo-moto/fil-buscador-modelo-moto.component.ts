import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModeloMoto } from 'src/app/models/index.models';
import { ModeloMotoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-buscador-modelo-moto',
  templateUrl: './fil-buscador-modelo-moto.component.html',
  styleUrls: ['./fil-buscador-modelo-moto.component.scss']
})
export class FilBuscadorModeloMotoComponent implements OnInit {

  @Output() emmit: EventEmitter<ModeloMoto> = new EventEmitter();

  busqueda: any;

  item: ModeloMoto;
  items: ModeloMoto[];
  constructor(private wsdl: ModeloMotoService) {
    this.busqueda = '';
    this.item = new ModeloMoto();
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
          this.items = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la busqueda realizada');
        }
      }
    } catch (error) {}
  }

  capturar(event: ModeloMoto) {
    if (event != undefined) {
      this.busqueda = event.nombre;
      this.emmit.emit(event);
      this.items = [];
    }
  }
}
